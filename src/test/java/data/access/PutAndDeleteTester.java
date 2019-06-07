package data.access;

import Password_and_DB_access.ConnectionProperties;
import Password_and_DB_access.SecretAccess;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Token;
import io.micronaut.test.annotation.MicronautTest;
import org.apache.tomcat.jdbc.pool.DataSource;
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
public class PutAndDeleteTester {


    @Inject
    InterfaceForMethods interfaceForMethods;
    ConnectionProperties connectionProperties;

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"5000","6000"})
    public void put_tester(String expected) throws StripeException, IOException, ParseException {

        Map<String, String> carrier = new HashMap<>();
        carrier.put("id", "ch_1EieQSLQEw7LOW34JBu8dKGb");
        carrier.put("amount", expected);
        carrier.put("balance_transaction","txn_1EezPfLQEw7LOW34Urg9VEQH");
        carrier.put("payment_method","card_1EezPeLQEw7LOW34xoZkNGq0");
        carrier.put("currency", "usd");

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> result = (Map<String, String>) interfaceForMethods.putter(carrier, connectionProperties.poolmethod()).body();
        System.out.println(result);

        Assertions.assertEquals(
                expected,
                result.get("Amount")
        );
    }

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"45, Amount cannot be less than 50 cents, ch_1EezPeLQEw7LOW34N0VylT5V","-52, Amount cannot be less than 50 cents, ch_1EezPeLQEw7LOW34N0VylT5V"}, delimiter = ',')
    public void put_error_tester(String value, String expected, String id) throws StripeException, IOException, ParseException {

        Map<String, String> carrier = new HashMap<>();
        carrier.put("id", id);
        carrier.put("amount", value);
        carrier.put("balance_transaction","txn_1EezPfLQEw7LOW34Urg9VEQH");
        carrier.put("payment_method","card_1EezPeLQEw7LOW34xoZkNGq0");
        carrier.put("currency", "usd");

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> result = (Map<String, String>) interfaceForMethods.putter(carrier, connectionProperties.poolmethod()).body();
        System.out.println(result);

        Assertions.assertEquals(
                expected,
                result.get("Error")
        );
    }

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"Record not found!!, random", "Record not found!!, Invalid"}, delimiter = ',')
    public void put_not_found_error_tester(String expected, String id) throws StripeException, IOException, ParseException {

        Map<String, String> carrier = new HashMap<>();
        carrier.put("id", id);
        carrier.put("amount", "522");
        carrier.put("balance_transaction","txn_1EezPfLQEw7LOW34Urg9VEQH");
        carrier.put("payment_method","card_1EezPeLQEw7LOW34xoZkNGq0");
        carrier.put("currency", "usd");

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> result = (Map<String, String>) interfaceForMethods.putter(carrier, connectionProperties.poolmethod()).body();
        String output = result.get("Response");

        Assertions.assertEquals(
                expected,
                output
        );
    }

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"ch_1Eif8dLQEw7LOW34cUKBRcux, Record deleted Successfully!!!!","ch_1EieKaLQEw7LOW34AzDQX7kM, Record deleted Successfully!!!!"}, delimiter = ',')
    public void delete_tester(String id, String expected) throws StripeException, SQLException, IOException, ParseException {

        //IMPORTANT
        //Change the id above to an existing id in your table.

        ConnectionProperties connectionProperties = new ConnectionProperties();
        DataSource datasource = connectionProperties.poolmethod();
        Map<String, String> result = (Map<String, String>) interfaceForMethods.deleter(datasource, id).body();
        System.out.println(result);

        Assertions.assertEquals(
                expected,
                result.get("Response")
        );
    }

    @Autowired
    @ParameterizedTest
    @CsvSource(value = {"RandomID, Record NOT found!!!!","Invalid, Record NOT found!!!!","sdjhs, Record NOT found!!!!"}, delimiter = ',')
    public void delete_error_tester(String id, String expected) throws StripeException, IOException, ParseException, SQLException {

        ConnectionProperties connectionProperties = new ConnectionProperties();

        Map<String, String> result = (Map<String, String>) interfaceForMethods.deleter(connectionProperties.poolmethod(), id).body();
        System.out.println(result);

        Assertions.assertEquals(
                expected,
                result.get("Response")
        );
    }


    //4242424242424241
    //4000000000000341
    //4000000000005126


}


