package data.access;

import Password_and_DB_access.ConnectionProperties;
import com.stripe.exception.CardException;
import com.stripe.model.Charge;
import io.micronaut.validation.Validated;
import org.apache.kafka.clients.consumer.*;
import org.apache.tomcat.jdbc.pool.DataSource;
import Password_and_DB_access.SecretAccess;

import javax.inject.Singleton;
import java.sql.*;
import java.util.*;

@Singleton
@Validated
public class KafkaConsumer implements Runnable {

    private volatile String value;
    private volatile int code;


    @Override
    public void run() {

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
            while (true) {
                ConsumerRecords records = kafkaConsumer.poll(10);
                for (Object record : records) {
                    System.out.println("!!!!!!!!!!!!!!!!");
                    System.out.println(String.format("Topic - %s, Partition - %d, Value: %s, Key: %s", ((ConsumerRecord) record).topic(), ((ConsumerRecord) record).partition(), ((ConsumerRecord) record).value(), ((ConsumerRecord) record).key()));
                    System.out.println("!!!!!!!!!!!!!!!!");


                    try {

                        ConnectionProperties connectionProperties = new ConnectionProperties();
                        SecretAccess secretAccess = new SecretAccess();

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
                            String finger = (String) ((ConsumerRecord) record).key();
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
                            pstmt = (PreparedStatement) conn.prepareStatement("insert into charge values(?,?,?,?,?,?,?,?)");
                            pstmt.setString(1, finger);
                            pstmt.setString(2, id);
                            pstmt.setLong(3, amount);
                            pstmt.setString(4, balancetransaction);
                            pstmt.setString(5, invoice);
                            pstmt.setString(6, pay_method);
                            pstmt.setString(7, receipt);
                            pstmt.setString(8, currency);


                            int i = pstmt.executeUpdate();
                            if (i > 0) {
                                code = 200;
                                value = "Record inserted successfully!";
                                System.out.println("Record inserted successfully!");
                            } else {
                                code = 400;
                                value = "Record NOT Inserted!!!!";
                                System.out.println("Record NOT Inserted!!!!");
                            }

                        }


                    } catch (CardException e) {
                        code = 500;
                        // Since it's a decline, CardException will be caught
                        System.out.println("Status is: " + e.getDeclineCode());
                        System.out.println("Message is: " + e.getMessage());
                        if (e.getMessage().equals("Your card's security code is incorrect.; code: incorrect_cvc")) {
                            value = "CvcCheck Failed";
                        } else if (e.getMessage().equals("Your card has expired.; code: expired_card")) {
                            value = "Card Expired.";
                        } else if (e.getMessage().equals("An error occurred while processing your card. Try again in a little bit.; code: processing_error")) {
                            value = "Processing Error.";
                        } else {
                            if (e.getDeclineCode().equals("insufficient_funds")) {
                                value = "Your card has insufficient funds. Card declined.";
                            } else if (e.getDeclineCode().equals("lost_card")) {
                                value = "This card has been marked as lost. Card declined.";
                            } else if (e.getDeclineCode().equals("stolen_card")) {
                                value = "This card has been marked as stolen. Card declined.";
                            } else if (e.getDeclineCode().equals("fraudulent")) {
                                value = "This card has been marked as fraudulent. Card declined.";
                            } else if (e.getDeclineCode().equals("generic_decline")) {
                                value = "Your card was declined.";
                            } else {
                                value = e.getMessage();
                            }
                        }
                    }
                    finally {

                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            kafkaConsumer.close();
        }

    }


    public Map<String, String> getValue(){
        Map<String, String> carrier = new HashMap<String, String>();
        carrier.put("Response", value);
        carrier.put("Code", String.valueOf(code));
        return carrier;
    }

//    public HttpResponse valuesetter(){
//
//    }

}