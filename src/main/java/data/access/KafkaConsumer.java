package data.access;

import Password_and_DB_access.ConnectionProperties;
import com.stripe.exception.CardException;
import com.stripe.model.Charge;
import io.micronaut.validation.Validated;
import org.apache.kafka.clients.consumer.*;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.json.simple.parser.ParseException;

import javax.inject.Singleton;
import java.io.IOException;
import java.sql.*;
import java.util.*;

@Singleton
@Validated
public class KafkaConsumer implements Runnable {

    private volatile String value;
    private volatile String identity;
    private volatile int code;
    private volatile boolean exit = false;




    @Override
    public void run() {
        identity = null;

        Properties properties = new Properties();
        properties.put("bootstrap.servers", "localhost:9092");
        properties.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("group.id", "test-group");

        org.apache.kafka.clients.consumer.KafkaConsumer kafkaConsumer = new org.apache.kafka.clients.consumer.KafkaConsumer(properties);
        List topics = new ArrayList();
        topics.add("naman");
        kafkaConsumer.subscribe(topics);
        try {
            while (!exit) {
                ConsumerRecords records = kafkaConsumer.poll(10);
                for (Object record : records) {

                    String finger = (String) ((ConsumerRecord) record).key();
                    identity = finger;


                    try {
                        ConnectionProperties connectionProperties = new ConnectionProperties();
                        DataSource datasource = connectionProperties.poolmethod();

                        //Create the charge object
                        Map<String, Object> params = new HashMap<>();
                        params.put("amount", 500);
                        params.put("currency", "usd");
                        params.put("description", "DATA");
                        params.put("source", (String)((ConsumerRecord) record).value());
                        Charge charge = Charge.create(params);


                        String address_line = charge.getPaymentMethodDetails().getCard().getChecks().getAddressLine1Check();
                        String zip_line = charge.getPaymentMethodDetails().getCard().getChecks().getAddressPostalCodeCheck();
                        String risk_level = charge.getOutcome().getRiskLevel();

                        if (((address_line == null) || address_line.equals("pass") || address_line.equals("unchecked")) && ((zip_line == null) || zip_line.equals("pass") || zip_line.equals("unchecked")) && (risk_level.equals("normal"))) {
                            //Getting the data for our database

                            String id = charge.getId();
                            Long amount = charge.getAmount();
                            String balancetransaction = charge.getBalanceTransaction();
                            String invoice = charge.getInvoice();
                            String pay_method = charge.getPaymentMethod();
                            String receipt = charge.getReceiptNumber();
                            String currency = charge.getCurrency();



                            //Initialize the connection and prepared statement
                            Connection conn = null;
                            PreparedStatement pstmt = null;


                            conn = (Connection) datasource.getConnection();
                            Statement st = conn.createStatement();
                            //Changing the database to 'work'
                            ResultSet rrs = st.executeQuery("use work");
                            pstmt = (PreparedStatement) conn.prepareStatement("insert into charge values(?,?,?,?,?,?,?,?,?,?)");
                            pstmt.setString(1, finger);
                            pstmt.setString(2, id);
                            pstmt.setLong(3, amount);
                            pstmt.setString(4, balancetransaction);
                            pstmt.setString(5, invoice);
                            pstmt.setString(6, pay_method);
                            pstmt.setString(7, receipt);
                            pstmt.setString(8, currency);
                            pstmt.setString(9, "pending");
                            pstmt.setString(10, "pending");


                            pstmt.executeUpdate();

                            code = 200;
                            value = "Record inserted successfully!";
                            insertResponse(code, value, datasource);


                        }else{
                            code = 400;
                            if(address_line.equals("fail") && zip_line.equals("fail")){
                                value = "AddressLine and ZipLine check failed";
                                failed_response(code, value);
                            }
                            else if(address_line.equals("fail")){
                                value ="AddressLine check failed";
                                failed_response(code, value);
                            }
                            else if(zip_line.equals("fail")){
                                value ="ZipLine check failed";
                                failed_response(code, value);
                            }
                            else if(address_line.equals("unavailable") || zip_line.equals("unavailable")){
                                value ="AddressLine or ZipLine check unavailable";
                                failed_response(code, value);
                            }
                            else if(risk_level.equals("elevated")){
                                value = "Risk level is elevated";
                                failed_response(code, value);
                            }
                        }


                    } catch (CardException e) {
                        code = 500;
                        // Since it's a decline, CardException will be caught
                        System.out.println("Status is: " + e.getDeclineCode());
                        System.out.println("Message is: " + e.getMessage());
                        if (e.getMessage().equals("Your card's security code is incorrect.; code: incorrect_cvc")) {
                            value = "CvcCheck Failed";
                            failed_response(code, value);
                        } else if (e.getMessage().equals("Your card has expired.; code: expired_card")) {
                            value = "Card Expired.";
                            failed_response(code, value);
                        } else if (e.getMessage().equals("An error occurred while processing your card. Try again in a little bit.; code: processing_error")) {
                            value = "Processing Error.";
                            failed_response(code, value);
                        } else {
                            if (e.getDeclineCode().equals("insufficient_funds")) {
                                value = "Your card has insufficient funds. Card declined.";
                                failed_response(code, value);
                            } else if (e.getDeclineCode().equals("lost_card")) {
                                value = "This card has been marked as lost. Card declined.";
                                failed_response(code, value);
                            } else if (e.getDeclineCode().equals("stolen_card")) {
                                value = "This card has been marked as stolen. Card declined.";
                                failed_response(code, value);
                            } else if (e.getDeclineCode().equals("fraudulent")) {
                                value = "This card has been marked as fraudulent. Card declined.";
                                failed_response(code, value);
                            } else if (e.getDeclineCode().equals("generic_decline")) {
                                value = "Your card was declined.";
                                failed_response(code, value);
                            } else {
                                value = e.getMessage();
                                failed_response(code, value);
                            }
                        }
                    } catch (Exception e){
                        code = 500;
                        value = e.getMessage();
                        failed_response(code, value);
                    }

                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            kafkaConsumer.close();
        }

    }

    public void insertResponse(Integer code, String value, DataSource datasource) throws SQLException {
        Connection conn = null;
        PreparedStatement pstmtt = null;

        conn = (Connection) datasource.getConnection();
        Statement st = conn.createStatement();
        //Changing the database to 'work'
        ResultSet rrs = st.executeQuery("use work");

        System.out.println(identity);
        System.out.println(value);
        System.out.println(code);
        pstmtt=  (PreparedStatement) conn.prepareStatement("update charge set Code = ? , Status= ? where Finger= ?");
        pstmtt.setString(1, String.valueOf(code));
        pstmtt.setString(2, value);
        pstmtt.setString(3, identity);
        pstmtt.executeUpdate();

    }

    public void failed_response(Integer code, String value) throws IOException, ParseException, SQLException {
        Connection conn = null;
        PreparedStatement pstmtt = null;

        ConnectionProperties connectionProperties = new ConnectionProperties();
        DataSource datasource = connectionProperties.poolmethod();

        conn = (Connection) datasource.getConnection();
        Statement st = conn.createStatement();
        //Changing the database to 'work'
        ResultSet rrs = st.executeQuery("use work");
        System.out.println(value);
        pstmtt=  (PreparedStatement) conn.prepareStatement("insert into charge values(?,?,?,?,?,?,?,?,?,?)");
        pstmtt.setString(1, identity);
        pstmtt.setString(2, null);
        pstmtt.setString(3, null);
        pstmtt.setString(4, null);
        pstmtt.setString(5, null);
        pstmtt.setString(6, null);
        pstmtt.setString(7, null);
        pstmtt.setString(8, null);
        pstmtt.setString(9, String.valueOf(code));
        pstmtt.setString(10, value);
        pstmtt.executeUpdate();
    }

    public void end(){
        exit = true;
    }



}