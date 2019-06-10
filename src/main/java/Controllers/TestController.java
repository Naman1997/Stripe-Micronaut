package Controllers;


import com.stripe.model.Token;
import Password_and_DB_access.ConnectionProperties;
import data.access.InterfaceForMethods;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;

import io.micronaut.http.*;
import io.micronaut.http.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import Password_and_DB_access.SecretAccess;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import java.util.UUID;


@Controller("/payment")
public class TestController {



   final protected InterfaceForMethods interfaceForMethods;
   final protected ConnectionProperties connectionProperties;
   final protected SecretAccess secretAccess;

   public TestController(InterfaceForMethods interfaceForMethods, ConnectionProperties connectionProperties, SecretAccess secretAccess){
       this.interfaceForMethods = interfaceForMethods;
       this.connectionProperties = connectionProperties;
       this.secretAccess = secretAccess;
   }

   @Get("/charger")
   @Operation(summary = "Endpoint created to test performance using jmeter")
   @Autowired
   public HttpResponse charger() throws StripeException, IOException, ParseException {

       //Gets stripe apiKey value
       Stripe.apiKey = secretAccess.secrets().get("StripeKey");

       // Token is created using Checkout or Elements !
       // Get the payment token ID submitted by the form:
       //Token value is embedded in the POST method body from index.html
       String token = String.valueOf(interfaceForMethods.tokencreator("4242424242424242").body());
       //Generates the connection properties to create the connection to the database.
       ConnectionProperties connectionProperties = new ConnectionProperties();
       DataSource datasource = connectionProperties.poolmethod();

       //POST method in interface as poster
       interfaceForMethods.poster(token, datasource);

       return HttpResponse.ok();

   }

   @Post("/send")
   @Autowired
   public HttpResponse sender() throws StripeException, IOException, ParseException {

       //Gets stripe apiKey value
       Stripe.apiKey = secretAccess.secrets().get("StripeKey");

       Map<String, Object> tokenParams = new HashMap<String, Object>();
       Map<String, Object> cardParams = new HashMap<String, Object>();
       cardParams.put("number", "4242424242424242");
       cardParams.put("exp_month", 5);
       cardParams.put("exp_year", 2020);
       cardParams.put("cvc", "314");

       cardParams.put("address_line1", "Lucknow");
       cardParams.put("address_zip", "56525");

       tokenParams.put("card", cardParams);

       Token token = Token.create(tokenParams);
       String id = token.getId();

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

       producer.send(new ProducerRecord<String, String>(topicName, finger.toString(), id));
       System.out.println("Message sent successfully");
       producer.close();

       return HttpResponse.ok().body(hm);
   }





}
