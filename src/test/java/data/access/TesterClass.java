package data.access;

import Password_and_DB_access.ConnectionProperties;
import Password_and_DB_access.SecretAccess;
import org.apache.tomcat.jdbc.pool.DataSource;
import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.Token;
import io.micronaut.test.annotation.MicronautTest;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;

import javax.inject.Inject;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@MicronautTest
public class TesterClass {


    @Inject
    InterfaceForMethods interfaceForMethods;

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"Invalid_token!!!!!, No such token: Invalid_token!!!!!; code: resource_missing"}, delimiter = ',')
    public void testpost(String id, String expected) throws CardException, IOException, ParseException, InterruptedException {

        KafkaConsumer kafkaConsumerExample1 = new KafkaConsumer();
        Thread t1 = new Thread(kafkaConsumerExample1);
        t1.start();

        SecretAccess secretAccess = new SecretAccess();
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        ConnectionProperties connectionProperties = new ConnectionProperties();
        DataSource dataSource = null;
        dataSource = connectionProperties.poolmethod();


        Map<String, String> fin = (Map<String, String>) (interfaceForMethods.poster(id, dataSource).body());
        String finger = fin.get("Response");

        Thread.sleep(8000);


        Map<String, String> res = (Map<String, String>) (interfaceForMethods.getter(finger, connectionProperties.poolmethod())).body();
        String result = res.get("status");

        System.out.println(result);
        Assertions.assertEquals(
                expected,
                result
        );
    }


    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"4000000000000010,AddressLine and ZipLine check failed","4000000000000028, AddressLine check failed", "4000000000000036, ZipLine check failed", "4000000000000044, AddressLine or ZipLine check unavailable", "4000000000000101, CvcCheck Failed"}, delimiter = ',')
    public void testpost_for_address_checks(String number, String expected) throws StripeException, IOException, ParseException, InterruptedException {
        KafkaConsumer kafkaConsumerExample1 = new KafkaConsumer();
        Thread t1 = new Thread(kafkaConsumerExample1);
        t1.start();


        SecretAccess secretAccess = new SecretAccess();
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        System.out.println(number);
        System.out.println(expected);

        Map<String, Object> tokenParams = new HashMap<String, Object>();
        Map<String, Object> cardParams = new HashMap<String, Object>();
        cardParams.put("number", number);
        cardParams.put("exp_month", 5);
        cardParams.put("exp_year", 2020);
        cardParams.put("cvc", "314");

        cardParams.put("address_line1", "Lucknow");
        cardParams.put("address_zip", "56525");

        tokenParams.put("card", cardParams);

        Token token = Token.create(tokenParams);
        String id = token.getId();

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> fin = (Map<String, String>) (interfaceForMethods.poster(id, connectionProperties.poolmethod()).body());
        String finger = fin.get("Response");

        Thread.sleep(8000);


        Map<String, String> res = (Map<String, String>) (interfaceForMethods.getter(finger, connectionProperties.poolmethod())).body();
        String result = res.get("status");

        System.out.println(res);
        System.out.println(result);


        Assertions.assertEquals(
                expected,
                result
        );
    }


    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"4000000000009235, Risk level is elevated", "4000000000004954, Your card was declined.", "4100000000000019, This card has been marked as fraudulent. Card declined.", "4000000000000002, Your card was declined."}, delimiter = ',')
    public void testpost_for_risk_checks(String number, String expected) throws StripeException, IOException, ParseException, InterruptedException {
        KafkaConsumer kafkaConsumerExample1 = new KafkaConsumer();
        Thread t1 = new Thread(kafkaConsumerExample1);
        t1.start();

        SecretAccess secretAccess = new SecretAccess();
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        System.out.println(number);
        System.out.println(expected);

        Map<String, Object> tokenParams = new HashMap<String, Object>();
        Map<String, Object> cardParams = new HashMap<String, Object>();
        cardParams.put("number", number);
        cardParams.put("exp_month", 5);
        cardParams.put("exp_year", 2020);
        cardParams.put("cvc", "314");

        cardParams.put("address_line1", "Lucknow");
        cardParams.put("address_zip", "56525");

        tokenParams.put("card", cardParams);

        Token token = Token.create(tokenParams);
        String id = token.getId();

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> fin = (Map<String, String>) (interfaceForMethods.poster(id, connectionProperties.poolmethod()).body());
        String finger = fin.get("Response");

        Thread.sleep(8000);


        Map<String, String> res = (Map<String, String>) (interfaceForMethods.getter(finger, connectionProperties.poolmethod())).body();
        String result = res.get("status");

        System.out.println(res);
        System.out.println(result);


        Assertions.assertEquals(
                expected,
                result
        );
    }

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"4000000000009995, Your card has insufficient funds. Card declined.", "4000000000009987, This card has been marked as lost. Card declined.", "4000000000009979, This card has been marked as stolen. Card declined."}, delimiter = ',')
    public void testpost_for_card_issues(String number, String expected) throws StripeException, IOException, ParseException, InterruptedException {
        KafkaConsumer kafkaConsumerExample1 = new KafkaConsumer();
        Thread t1 = new Thread(kafkaConsumerExample1);
        t1.start();

        SecretAccess secretAccess = new SecretAccess();
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        System.out.println(number);
        System.out.println(expected);

        Map<String, Object> tokenParams = new HashMap<String, Object>();
        Map<String, Object> cardParams = new HashMap<String, Object>();
        cardParams.put("number", number);
        cardParams.put("exp_month", 5);
        cardParams.put("exp_year", 2020);
        cardParams.put("cvc", "314");

        cardParams.put("address_line1", "Lucknow");
        cardParams.put("address_zip", "56525");

        tokenParams.put("card", cardParams);

        Token token = Token.create(tokenParams);
        String id = token.getId();

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> fin = (Map<String, String>) (interfaceForMethods.poster(id, connectionProperties.poolmethod()).body());
        String finger = fin.get("Response");

        Thread.sleep(8000);


        Map<String, String> res = (Map<String, String>) (interfaceForMethods.getter(finger, connectionProperties.poolmethod())).body();
        String result = res.get("status");

        System.out.println(res);
        System.out.println(result);


        Assertions.assertEquals(
                expected,
                result
        );
    }


    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"4000000000000069, Card Expired.", "4000000000000127, CvcCheck Failed", "4000000000000119, Processing Error.", "4000000000000077, Record inserted successfully!", "4000000000000093, Record inserted successfully!"}, delimiter = ',')
    public void other_issues(String number, String expected) throws StripeException, IOException, ParseException, InterruptedException {
        KafkaConsumer kafkaConsumerExample1 = new KafkaConsumer();
        Thread t1 = new Thread(kafkaConsumerExample1);
        t1.start();

        SecretAccess secretAccess = new SecretAccess();
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        System.out.println(number);
        System.out.println(expected);

        Map<String, Object> tokenParams = new HashMap<String, Object>();
        Map<String, Object> cardParams = new HashMap<String, Object>();
        cardParams.put("number", number);
        cardParams.put("exp_month", 5);
        cardParams.put("exp_year", 2020);
        cardParams.put("cvc", "314");

        cardParams.put("address_line1", "Lucknow");
        cardParams.put("address_zip", "56525");

        tokenParams.put("card", cardParams);

        Token token = Token.create(tokenParams);
        String id = token.getId();

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> fin = (Map<String, String>) (interfaceForMethods.poster(id, connectionProperties.poolmethod()).body());
        String finger = fin.get("Response");

        Thread.sleep(8000);


        Map<String, String> res = (Map<String, String>) (interfaceForMethods.getter(finger, connectionProperties.poolmethod())).body();
        String result = res.get("status");

        System.out.println(res);
        System.out.println(result);


        Assertions.assertEquals(
                expected,
                result
        );
    }

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"Invalid_finger, Record NOT found!!!!"}, delimiter = ',')
    public void brand_tester(String finger, String expected) throws IOException, ParseException {
        System.out.println(finger);
        System.out.println(expected);

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> res = (Map<String, String>) interfaceForMethods.getter(finger, connectionProperties.poolmethod()).body();
        System.out.println(res);
        String result = res.get("status");

        Assertions.assertEquals(
                expected,
                result
        );
    }


}
