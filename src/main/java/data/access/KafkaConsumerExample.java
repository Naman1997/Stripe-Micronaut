package data.access;

import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import io.micronaut.http.HttpResponse;
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.tomcat.jdbc.pool.DataSource;

import java.sql.*;
import java.util.*;

public class KafkaConsumerExample implements Runnable {

//    final protected InterfaceForMethods interfaceForMethods;
//    final protected ConnectionProperties connectionProperties;
//    final protected SecretAccess secretAccess;
//
//    public KafkaConsumerExample(InterfaceForMethods interfaceForMethods, ConnectionProperties connectionProperties, SecretAccess secretAccess) throws SQLException, StripeException {
//        this.interfaceForMethods = interfaceForMethods;
//        this.connectionProperties = connectionProperties;
//        this.secretAccess = secretAccess;
//    }


//    KafkaConsumerExample kafkaConsumerExample1 = new KafkaConsumerExample();
//    Thread t1 = new Thread((kafkaConsumerExample1));

    @Override
    public void run() {
        Properties properties = new Properties();
        properties.put("bootstrap.servers", "localhost:9092");
        properties.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("group.id", "test-group");

        KafkaConsumer kafkaConsumer = new KafkaConsumer(properties);
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
                                System.out.println("Record inserted successfully!");
                            } else
                                System.out.println("Record NOT Inserted!!!!");

                        }


                    } catch (CardException e) {
                        // Since it's a decline, CardException will be caught
                        System.out.println("Status is: " + e.getDeclineCode());
                        System.out.println("Message is: " + e.getMessage());
//                        if (e.getMessage().equals("Your card's security code is incorrect.; code: incorrect_cvc")) {
//                            return HttpResponse.serverError().body("CvcCheck Failed");
//                        } else if (e.getMessage().equals("Your card has expired.; code: expired_card")) {
//                            return HttpResponse.serverError().body("Card Expired.");
//                        } else if (e.getMessage().equals("An error occurred while processing your card. Try again in a little bit.; code: processing_error")) {
//                            return HttpResponse.serverError().body("Processing Error.");
//                        } else {
//                            if (e.getDeclineCode().equals("insufficient_funds")) {
//                                return HttpResponse.serverError().body("Your card has insufficient funds. Card declined.");
//                            } else if (e.getDeclineCode().equals("lost_card")) {
//                                return HttpResponse.serverError().body("This card has been marked as lost. Card declined.");
//                            } else if (e.getDeclineCode().equals("stolen_card")) {
//                                return HttpResponse.serverError().body("This card has been marked as stolen. Card declined.");
//                            } else if (e.getDeclineCode().equals("fraudulent")) {
//                                return HttpResponse.serverError().body("This card has been marked as fraudulent. Card declined.");
//                            } else if (e.getDeclineCode().equals("generic_decline")) {
//                                return HttpResponse.serverError().body("Your card was declined.");
//                            } else {
//                                return HttpResponse.serverError().body(e.getMessage());
//                            }
//                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            kafkaConsumer.close();
        }

    }
}