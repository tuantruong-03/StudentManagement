package student.mangement.code.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;


@Component
public class JwtUtil  {
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

	// @Value("${jwt.jwtSecretBytes}")
	private String jwtSecret = "mySecret";

    private byte[] jwtSecretBytes = jwtSecret.getBytes();
    //retrieve username from jwt token
	public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	//retrieve expiration date from jwt token
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
    //for retrieveing any information from token we will need the jwtSecretBytes key
	public Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecretBytes).parseClaimsJws(token).getBody();
	}

	//check if the token has expired
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	//generate token for user (subject is username)
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}

	//while creating the token -
	//1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
	//2. Sign the JWT using the HS512 algorithm and jwtSecretBytes key.
	//3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
	//   compaction of the JWT to a URL-safe string 
	private String doGenerateToken(Map<String, Object> claims, String subject) {

		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, jwtSecretBytes).compact();
	}

	public boolean validateToken(String token) {
		try {
			// Verify with jwtSecretBytes key
			Jwts.parser().setSigningKey(jwtSecretBytes).parseClaimsJws(token);
			return true && isTokenExpired(token);
		} catch (SignatureException e) {
			System.err.println("Invalid JWT signature: {} " + e.getMessage());
		} catch (MalformedJwtException e) {
			System.err.println("Invalid JWT token: {} " + e.getMessage());
		} catch (ExpiredJwtException e) {
			System.err.println("JWT token is expired: {} " + e.getMessage());
		} catch (UnsupportedJwtException e) {
			System.err.println("JWT token is unsupported: {} " + e.getMessage());
		} catch (IllegalArgumentException e) {
			System.err.println("JWT claims string is empty: {} " + e.getMessage());
		}

		return false;
	}
	

}
