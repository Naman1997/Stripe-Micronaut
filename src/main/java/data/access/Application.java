package data.access;

import io.micronaut.runtime.Micronaut;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;


@OpenAPIDefinition(
        info = @Info(
                title = "Micronaut-API",
                version = "1.0",
                description = "API for creating and managing charges from Stripe API",
                license = @License(name = "Apache 2.0", url = "http://foo.bar"),
                contact = @Contact(url = "", name = "Naman", email = "@gmail.com")
        )
)
public class Application {

    public static void main(String[] args){


        Micronaut.run(Application.class);
        KafkaConsumer kafkaConsumerExample1 = new KafkaConsumer();
        Thread t1 = new Thread(kafkaConsumerExample1);
        t1.start();

    }

}