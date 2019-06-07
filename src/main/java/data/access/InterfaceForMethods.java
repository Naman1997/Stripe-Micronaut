package data.access;

import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import io.micronaut.http.HttpResponse;

import org.apache.tomcat.jdbc.pool.DataSource;
import sun.tools.jconsole.HTMLPane;

import java.sql.SQLException;
import java.util.Map;

public interface InterfaceForMethods {

    HttpResponse getter(String finger, DataSource dataSource);

    HttpResponse refunder(String id, DataSource datasource) throws StripeException, SQLException;

    HttpResponse tokencreator(String cardNum) throws StripeException;

    HttpResponse poster(String token, DataSource dataSource);

    HttpResponse putter(Map<String, String> hm, DataSource datasource) throws StripeException;

    HttpResponse deleter(DataSource datasource, String id) throws SQLException;

}
