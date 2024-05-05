package student.mangement.code.configuration;

import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import student.mangement.code.model.User;
import student.mangement.code.service.UserService;
import student.mangement.code.utils.JwtUtil;

public class JwtTokenFilter extends OncePerRequestFilter {
    @Autowired
    UserService userService;
    @Autowired
    JwtUtil jwtUtil;
    private static final Set<String> EXCLUDE_URL_PATTERNS = new HashSet<>(Arrays.asList(
        "/auth/login",
        "/public/**"
    ));
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
                // Skip JWT check for specified endpoints
        if (shouldNotFilter(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }
        
        try {
            String token = resolveToken(request);
            // System.out.println("token " + token);
            if (token !=null && jwtUtil.validateToken(token)) {
                String username = jwtUtil.getUsernameFromToken(token);
                User  user = (User)userService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                
            }  else {
                SecurityContextHolder.clearContext(); // Ensure no authentication in security context holder
                if (token == null) {
                    System.out.println("No JWT token found in request headers");
                } else {
                    System.out.println("Invalid JWT token");
                }
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"); // Respond with 401
                return; // Stop further filter execution and return
            }
        } catch(Exception e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "E");
            System.err.println(e);
            return; // Stop further filter execution and return
        } 
        filterChain.doFilter(request, response);
    }
    
    // Extract "Bearer $token" fron "Authorization" header
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("authorization");
        for (Enumeration<String> e = request.getHeaderNames(); e.hasMoreElements();) {
            String nextHeader = e.nextElement();
            String value = request.getHeader(nextHeader);
            System.out.println(nextHeader + " " + value);
        }
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove "Bearer " to get the token
        }
        return null;
    }

    private boolean shouldNotFilter(String path) {
        return EXCLUDE_URL_PATTERNS.stream().anyMatch(url -> url.equals(path));
    }


}
