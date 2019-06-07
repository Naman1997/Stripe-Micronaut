package Controllers;


import Password_and_DB_access.ConnectionProperties;
import data.access.InterfaceForMethods;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;


import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

import com.stripe.model.Refund;
import io.micronaut.http.*;
import io.micronaut.http.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import Password_and_DB_access.SecretAccess;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

//@Secured("isAuthenticated()")
@Controller("/")
public class CustomerContoller {

    final protected InterfaceForMethods interfaceForMethods;
    final protected ConnectionProperties connectionProperties;
    final protected SecretAccess secretAccess;

    public CustomerContoller(InterfaceForMethods interfaceForMethods, ConnectionProperties connectionProperties, SecretAccess secretAccess) {
        this.interfaceForMethods = interfaceForMethods;
        this.connectionProperties = connectionProperties;
        this.secretAccess = secretAccess;
    }

//    @Get("/")
//    String index(Principal principal) {
//        return principal.getName();
//    }

    @Get("/final/{finger}")
    @Operation(summary = "Returns the charge object as created in the database if it exists provided that the user provides the endpoint with the finger of the required object")
    @Autowired
    public HttpResponse get(String finger) throws IOException, ParseException {
        //Gets stripe apiKey value
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        //Generates the connection properties to create the connection to the database.
        ConnectionProperties connectionProperties = new ConnectionProperties();
        DataSource datasource = connectionProperties.poolmethod();

        HttpResponse result = interfaceForMethods.getter(finger, datasource);

        return result;
    }


    @Consumes(MediaType.APPLICATION_JSON)
    @Post("/charges")
    @Operation(summary = "Sends the token to Stripe API for validating charge")
    @Autowired
    public HttpResponse charge(@Body Map<String, String> hm) throws CardException, IOException, ParseException {

        try{
            //Gets stripe apiKey value
            Stripe.apiKey = secretAccess.secrets().get("StripeKey");

            // Token is created using Checkout or Elements !
            // Get the payment token ID submitted by the form:
            //Token value is embedded in the POST method body from index.html
            String token = hm.get("tokendata");
            System.out.println(token);

            //Generates the connection properties to create the connection to the database.
            ConnectionProperties connectionProperties = new ConnectionProperties();
            DataSource datasource = connectionProperties.poolmethod();
            System.out.println("going in");
            //POST method in interface as poster
            interfaceForMethods.poster(token, datasource);
            System.out.println("done");

            return HttpResponse.ok().body("Token in queue");
        }
        catch (Exception e){
            return HttpResponse.serverError().body(e.getMessage());
        }

    }


    @Put("/update")
    @Operation(summary = "Updates the data given that the body contains the id of the row that needs to be updated")
    @Autowired
    public HttpResponse update(@Body Map<String, String> hm) throws IOException, ParseException, StripeException {

        //Gets stripe apiKey value
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        //Generates the connection properties to create the connection to the database.
        DataSource datasource = connectionProperties.poolmethod();

        //PUT method in interface as putter
        HttpResponse result = interfaceForMethods.putter(hm, datasource);


        return result;

    }


    @Get("/stripeuser/{id}")
    @Operation(summary = "Gets the row data from the Stripe API of the given ID and sends in JSON format")
    @Autowired
    public HttpResponse getDatabyid(String id) throws StripeException, IOException, ParseException {

        //Gets stripe apiKey value
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        return HttpResponse.ok().body(Charge.retrieve(id));
    }

    @Get("/stripeall/{count}")
    @Operation(summary = "Sends some of the database's data(depending on the count) in JSON form")
    @Autowired
    public HttpResponse getallStripedata(int count) throws StripeException, IOException, ParseException {

        //Gets stripe apiKey value
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        //From the STRIPE documentation. URL: https://stripe.com/docs/api/charges. Click on the last GET method.
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("limit", String.valueOf(count));

        return HttpResponse.ok().body(Charge.list(chargeParams));
    }


    @Delete("/delete/{id}")
    @Operation(summary = "Deletes row data in the database of the given ID")
    @Autowired
    public HttpResponse deleteById(String id) throws IOException, ParseException, SQLException {

        //Generates the connection properties to create the connection to the database.
        DataSource datasource = connectionProperties.poolmethod();

        //DELETE method in interface as deleter
        HttpResponse result = interfaceForMethods.deleter(datasource, id);

        return result;
    }


    @Post("/refund/{id}")
    @Operation(summary = "Refunds a charge given it's ID")
    @Autowired
    public HttpResponse refundMaker(String id) throws StripeException, IOException, ParseException, SQLException {

        //Gets stripe apiKey value
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        //Generates the connection properties to create the connection to the database.
        DataSource datasource = connectionProperties.poolmethod();

        HttpResponse result = interfaceForMethods.refunder(id, datasource);

        return result;
    }

    @Get("/refundget/{id}")
    @Operation(summary = "Retrieves the details of an existing refund.")
    @Autowired
    public HttpResponse getRefundById(String id) throws StripeException, IOException, ParseException {

        //Gets stripe apiKey value
        Stripe.apiKey = secretAccess.secrets().get("StripeKey");

        Refund refund = Refund.retrieve(id);

        return HttpResponse.created(refund);
    }
}