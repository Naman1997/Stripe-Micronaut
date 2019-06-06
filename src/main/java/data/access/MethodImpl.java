package data.access;


import com.stripe.model.Refund;
import com.stripe.model.Token;
import io.micronaut.validation.Validated;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.tomcat.jdbc.pool.DataSource;

import javax.inject.Singleton;

import com.stripe.exception.*;
import com.stripe.model.Charge;
import io.micronaut.http.HttpResponse;


import java.sql.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;


@Singleton
@Validated
public class MethodImpl implements InterfaceForMethods {



    @Override
    public HttpResponse poster(String token, DataSource datasource){
        Map<String, Object> carrier = new HashMap<>();

        try{
            UUID finger = UUID.randomUUID();

            //Assign topicName to string variable
            String topicName = "naman";

            // create instance for properties to access producer configs
            Properties props = new Properties();

            //Assign localhost id
            props.put("bootstrap.servers", "localhost:9092");

            //Set acknowledgements for producer requests.
            props.put("acks", "all");

            //If the request fails, the producer can automatically retry,
            props.put("retries", 0);

            //Specify buffer size in config
            props.put("batch.size", 16384);

            //Reduce the no of requests less than 0
            props.put("linger.ms", 1);

            //The buffer.memory controls he total amount of memory available to the producer for buffering.
            props.put("buffer.memory", 33554432);

            props.put("key.serializer",
                    "org.apache.kafka.common.serialization.StringSerializer");

            props.put("value.serializer",
                    "org.apache.kafka.common.serialization.StringSerializer");

            Producer<String, String> producer = new KafkaProducer
                    <String, String>(props);

            Map<String, String> hm = new HashMap<>();
            hm.put("Response", finger.toString());

            producer.send(new ProducerRecord<String, String>(topicName, finger.toString(), token));
            System.out.println("Message sent successfully");
            producer.close();



            return HttpResponse.ok().body(finger);

        }
        catch (Exception e){
            return HttpResponse.badRequest().body(e.getMessage());
        }
    }

    @Override
    public HttpResponse getter(String finger, DataSource datasource) {
        Map<String, String> carrier = new HashMap<>();
        Connection conn=null;
        PreparedStatement pstmt=null;
        ResultSet rs=null;
        try
        {
            conn=   (Connection) datasource.getConnection();
            Statement st = conn.createStatement();
            //Changing the database to 'work'
            ResultSet rrs = st.executeQuery("use work");
            pstmt=  (PreparedStatement) conn.prepareStatement("select * from charge where Finger = ?");
            pstmt.setString(1,finger);
            rs=pstmt.executeQuery();
            if(rs.next())
            {
                String id =rs.getString("id");
                String Amount =rs.getString("Amount");
                String BalanceTransaction =rs.getString("BalanceTransaction");
                String Invoice = rs.getString("Invoice");
                String PaymentMethod = rs.getString("PaymentMethod");
                String ReceiptNumber = rs.getString("ReceiptNumber");
                String Currency = rs.getString("Currency");

                carrier.put("id", id);
                carrier.put("amount", Amount);
                carrier.put("balance transaction", BalanceTransaction);
                carrier.put("invoice", Invoice);
                carrier.put("paymentnumber", PaymentMethod);
                carrier.put("receiptnumber", ReceiptNumber);
                carrier.put("currency", Currency);

                return HttpResponse.ok().body(carrier);
            }

            else
                return HttpResponse.badRequest().body("Record NOT found!!!!");

        }
        catch(Exception e)
        {
            return HttpResponse.serverError().body(e);
        }
    }

    @Override
    public HttpResponse putter(Map<String, String> hm, DataSource datasource) throws StripeException {
        Map<String, Object> carrier = new HashMap<>();

        //Getting the updated data from the body
        String id = hm.get("id");
        long amount = Long.parseLong(hm.get("amount"));
        String balancetransaction = hm.get("balance_transaction");
        String invoice = hm.get("invoice");
        String pay_method = hm.get("payment_method");
        String receipt = hm.get("receipt_number");
        String currency = hm.get("currency");

        //Initialize connection and prepared statement
        Connection conn=null;
        PreparedStatement pstmt=null;

        if(amount>50){
            try
            {

                conn=   (Connection) datasource.getConnection();
                Statement st = conn.createStatement();
                ResultSet rrs = st.executeQuery("use work");
                pstmt=  (PreparedStatement) conn.prepareStatement("update charge set Amount = ? , BalanceTransaction= ? , Invoice = ? , PaymentMethod = ? , ReceiptNumber = ? , Currency = ? where id= ?");
                pstmt.setString(1, String.valueOf(amount));
                pstmt.setString(2,balancetransaction);
                pstmt.setString(3,invoice);
                pstmt.setString(4,pay_method);
                pstmt.setString(5,receipt);
                pstmt.setString(6,currency);
                pstmt.setString(7,id);



                int i = pstmt.executeUpdate();
                if(i>0)
                {
                    carrier.put("Id",id);
                    carrier.put("Amount", String.valueOf(amount));
                    carrier.put("BalanceTransaction", balancetransaction);
                    carrier.put("Invoice", invoice);
                    carrier.put("PaymentMethod", pay_method);
                    carrier.put("ReceiptNumber", receipt);
                    carrier.put("Currency", currency);

                    //Updating in stripe
                    Charge charge = Charge.retrieve(id);
                    Map<String, Object> params = new HashMap<>();
                    params.put("metadata", hm);
                    charge.update(params);

                    carrier.put("Response Body", charge);

                    return io.micronaut.http.HttpResponse.ok().body(carrier);
                }
                else {
                    //Some database connection issue
                    carrier.put("Response", "Record not found!!");
                    return io.micronaut.http.HttpResponse.badRequest().body(carrier);
                }

            } catch(Exception e)
            {
                //Some stripe connection issue
                carrier.put("Error Message",e.getMessage());
                return io.micronaut.http.HttpResponse.serverError().body(carrier);
            }
        }
        else{
            carrier.put("Error", "Amount cannot be less than 50 cents");
            return HttpResponse.badRequest().body(carrier);
        }
    }


    @Override
    public HttpResponse deleter(DataSource datasource, String id) throws SQLException {
        Connection conn=null;
        PreparedStatement pstmt=null;

        Map< String,String> hm = new HashMap< String,String>();


            conn=   (Connection) datasource.getConnection();
            Statement st = conn.createStatement();
            ResultSet rrs = st.executeQuery("use work");
            pstmt=  (PreparedStatement) conn.prepareStatement("delete from charge where id = ?");
            pstmt.setString(1,id);

            int i = pstmt.executeUpdate();
            if(i>0)
            {
                hm.put("Response","Record deleted Successfully!!!!");
                return (HttpResponse) io.micronaut.http.HttpResponse.ok().body(hm);
            }
            else {
                //Some database connection issue
                hm.put("Response", "Record NOT found!!!!");
                return (HttpResponse) io.micronaut.http.HttpResponse.badRequest().body(hm);
            }


    }



    @Override
    public HttpResponse refunder(String id, DataSource datasource) throws StripeException, SQLException {
        Map<String, String> carrier = new HashMap<>();
        try {
            Map<String, Object> refundParams = new HashMap<String, Object>();
            refundParams.put("charge", id);

            Refund result = Refund.create(refundParams);

            String refund_id = result.getId();
            long amount = result.getAmount();
            String balance_transaction = result.getBalanceTransaction();
            String charge = result.getCharge();
            String currency = result.getCurrency();
            String status = result.getStatus();
            String failure_reason = result.getFailureReason();

            //Initialize the connection and prepared statement
            Connection conn=null;
            PreparedStatement pstmt=null;

            conn=   (Connection) datasource.getConnection();
            Statement st = conn.createStatement();
            //Changing the database to 'work'
            ResultSet rrs = st.executeQuery("use work");
            pstmt=  (PreparedStatement) conn.prepareStatement("insert into refund values(?,?,?,?,?,?,?)");
            pstmt.setString(1,refund_id);
            pstmt.setLong(2,amount);
            pstmt.setString(3,balance_transaction);
            pstmt.setString(4,charge);
            pstmt.setString(5,currency);
            pstmt.setString(6,status);
            pstmt.setString(7, failure_reason);

            pstmt.executeUpdate();

            carrier.put("Refund_Id", refund_id);
            carrier.put("Amount", String.valueOf(amount));
            carrier.put("BalanceTransaction", balance_transaction);
            carrier.put("Charge", charge);
            carrier.put("Currency", currency);
            carrier.put("Status", status);
            carrier.put("FailureReason", failure_reason);

            return HttpResponse.ok().body(carrier);

        }
        catch (Exception e){
            carrier.put("Error Message",e.getMessage());
            return HttpResponse.serverError().body(carrier);
        }
    }

    @Override
    public HttpResponse tokencreator(String cardNum) throws StripeException {
        try {

            Map<String, Object> tokenParams = new HashMap<String, Object>();
            Map<String, Object> cardParams = new HashMap<String, Object>();
            cardParams.put("number", cardNum);
            cardParams.put("exp_month", 5);
            cardParams.put("exp_year", 2020);
            cardParams.put("cvc", "314");

            cardParams.put("address_line1", "Lucknow");
            cardParams.put("address_zip", "56525");

            tokenParams.put("card", cardParams);

            Token token = Token.create(tokenParams);
            String id = token.getId();

            return HttpResponse.ok().body(id);
        }
        catch (Exception e){
            return HttpResponse.serverError().body(e.getMessage());
        }
    }



}
