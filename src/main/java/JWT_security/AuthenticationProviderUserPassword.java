package JWT_security;

import io.micronaut.security.authentication.AuthenticationFailed;
import io.micronaut.security.authentication.AuthenticationProvider;
import io.micronaut.security.authentication.AuthenticationRequest;
import io.micronaut.security.authentication.AuthenticationResponse;
import io.micronaut.security.authentication.UserDetails;
import io.reactivex.Flowable;
import org.reactivestreams.Publisher;
import Password_and_DB_access.SecretAccess;

import javax.inject.Singleton;
import java.util.ArrayList;

@Singleton
public class AuthenticationProviderUserPassword implements AuthenticationProvider  {

    final protected SecretAccess secretAccess;

    public AuthenticationProviderUserPassword(SecretAccess secretAccess){
        this.secretAccess = secretAccess;
    }

    @Override
    public Publisher<AuthenticationResponse> authenticate(AuthenticationRequest authenticationRequest) {

        String username = null;
        String password = null;

        try {
            username = secretAccess.secrets().get("loginuser");
            password = secretAccess.secrets().get("loginpass");

        }
        catch (Exception e) {
            e.printStackTrace();
        }

        if ( authenticationRequest.getIdentity().equals(username) &&
                authenticationRequest.getSecret().equals(password) ) {
            return Flowable.just(new UserDetails((String) authenticationRequest.getIdentity(), new ArrayList<>()));
        }
        return Flowable.just(new AuthenticationFailed());
    }
}