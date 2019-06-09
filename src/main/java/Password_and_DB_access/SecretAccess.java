package Password_and_DB_access;

import io.micronaut.validation.Validated;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.inject.Singleton;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Map;


@Singleton
@Validated
public class SecretAccess {
    public Map<String, String> secrets() throws IOException, ParseException {
        JSONParser jsonParser = new JSONParser();
        Path path = FileSystems.getDefault().getPath("src\\main\\java\\Password_and_DB_access\\secret.json").toAbsolutePath();
        FileReader reader = new FileReader(String.valueOf(path));
            Object object = jsonParser.parse(reader);

            JSONObject scraper = (JSONObject) object;

            return (Map<String, String>) scraper;

    }

}
