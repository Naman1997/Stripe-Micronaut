package data.access;

import Password_and_DB_access.ConnectionProperties;
import Password_and_DB_access.SecretAccess;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Refund;
import com.stripe.model.Token;
import io.micronaut.http.HttpResponse;
import io.micronaut.test.annotation.MicronautTest;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;

import javax.inject.Inject;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;


@MicronautTest
public class BrandTester {



    @Inject
    InterfaceForMethods interfaceForMethods;

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"4242424242424242, Record inserted successfully!", "4000056655665556, Record inserted successfully!", "5555555555554444, Record inserted successfully!", "2223003122003222, Record inserted successfully!", "5200828282828210, Record inserted successfully!", "5105105105105100, Record inserted successfully!", "378282246310005, Record inserted successfully!", "371449635398431, Record inserted successfully!", "6011111111111117, Record inserted successfully!", "6011000990139424, Record inserted successfully!", "30569309025904, Record inserted successfully!", "38520000023237, Record inserted successfully!", "3566002020360505, Record inserted successfully!", "6200000000000005, Record inserted successfully!", "4000000000000341, Your card was declined."}, delimiter = ',')
    public void brand_tester(String number, String expected) throws StripeException, IOException, ParseException, InterruptedException {
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
        kafkaConsumerExample1.end();


        Assertions.assertEquals(
                expected,
                result
        );
    }


    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"4242424242424241, Your card number is incorrect.; code: incorrect_number"}, delimiter = ',')
    public void issue_cards_that_needed_new_classes_1(String number, String expected) throws StripeException, IOException, ParseException {
        SecretAccess secretAccess = new SecretAccess();
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        System.out.println(number);
        System.out.println(expected);

        String result = String.valueOf(interfaceForMethods.tokencreator(number).body());

        System.out.println("!!!"+result+"!!!");



        Assertions.assertEquals(
                expected,
                result
        );
    }

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"4000000000005126, expired_or_canceled_card"}, delimiter = ',')
    public void issue_cards_that_needed_new_classes_2(String number, String expected) throws StripeException, IOException, ParseException, InterruptedException, SQLException {
        SecretAccess secretAccess = new SecretAccess();
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        ConnectionProperties connectionProperties = new ConnectionProperties();

        System.out.println("1"+number);
        System.out.println("2"+expected);

        String id = String.valueOf(interfaceForMethods.tokencreator(number).body());
        System.out.println("3"+id);

        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", 500);
        chargeParams.put("currency", "usd");
        chargeParams.put("description", "TEST");
        chargeParams.put("source", id);
        Charge charge = Charge.create(chargeParams);


        Map<String, String> refund_data = (Map<String, String>) interfaceForMethods.refunder(charge.getId(), connectionProperties.poolmethod()).body();

        String refund_id = refund_data.get("Refund_Id");

        System.out.println(refund_data);

        Thread.sleep(8000);

        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        Refund result = Refund.retrieve(refund_id);

        System.out.println(result);

        Assertions.assertEquals(
                expected,
                result.getFailureReason()
        );
    }



}
