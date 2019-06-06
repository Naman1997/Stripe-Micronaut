package data.access;

import io.micronaut.validation.Validated;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.inject.Singleton;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;


@Singleton
@Validated
public class SecretAccess {
    protected Map<String, String> secrets() throws IOException, ParseException {
        JSONParser jsonParser = new JSONParser();
        FileReader reader = new FileReader("C:\\Users\\Naman\\Desktop\\Old_Work\\data-access\\src\\main\\java\\data\\access\\secret.json");
            Object object = jsonParser.parse(reader);

            JSONObject scraper = (JSONObject) object;

            return (Map<String, String>) scraper;

    }

}
