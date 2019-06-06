package data.access;

import io.micronaut.validation.Validated;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.json.simple.parser.ParseException;

import javax.inject.Singleton;
import java.io.IOException;


@Singleton
@Validated
public class ConnectionProperties {

    //Go to https://tomcat.apache.org/tomcat-9.0-doc/jdbc-pool.html#Plain_Ol'_Java for more documentation.
    protected DataSource poolmethod() throws IOException, ParseException {

        SecretAccess secretAccess = new SecretAccess();


        String username = secretAccess.secrets().get("username");
        String password = secretAccess.secrets().get("password");

        PoolProperties p = new PoolProperties();
        p.setUrl("jdbc:mysql://localhost:3306/mysql");
        p.setDriverClassName("com.mysql.cj.jdbc.Driver");
        p.setUsername(username);
        p.setPassword(password);
        p.setJmxEnabled(true);
        p.setTestWhileIdle(false);
        p.setTestOnBorrow(true);
        p.setValidationQuery("SELECT 1");
        p.setTestOnReturn(false);
        p.setValidationInterval(30000);
        p.setTimeBetweenEvictionRunsMillis(30000);
        p.setMaxActive(50);
        p.setInitialSize(10);
        //Max Wait set to 0 to increase performance. https://docs.oracle.com/cd/E19159-01/819-3681/abehq/index.html
        p.setMaxWait(0);
        //Increased the Abandon Timeout value so that, Pool is not stopped in the middle of execution
        //https://stackoverflow.com/questions/13129070/webapp-tomcat-jdbc-pooled-db-connection-throwing-abandon-exception#
        p.setRemoveAbandonedTimeout(6000);
        p.setMinEvictableIdleTimeMillis(30000);
        //Added max idle
        p.setMinIdle(50);
        p.setMaxIdle(50);
        p.setLogAbandoned(true);
        p.setRemoveAbandoned(true);
        p.setJdbcInterceptors(
                "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
                        "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");
        org.apache.tomcat.jdbc.pool.DataSource datasource = new org.apache.tomcat.jdbc.pool.DataSource();
        datasource.setPoolProperties(p);
        return datasource;
    }
}
