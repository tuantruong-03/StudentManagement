package student.mangement.code.configuration;

import java.io.IOException;

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

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("jwtFilter ");
        JwtUtil jwtUtil = new JwtUtil();
        String token = resolveToken(request);
        System.out.println(token);
        if (token != null) {
            String username = jwtUtil.getUsernameFromToken(token);
            User user =(User) userService.loadUserByUsername(username);
            if (!jwtUtil.validateToken(token, user)) { // Username in token doesn't match with current user
                filterChain.doFilter(request, response);
                return;
            }

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                user, null, user.getAuthorities() );
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("authentication " + authentication.toString());
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        System.out.println("request.getHedaer " + request.getHeader("Authorization"));
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove "Bearer " to get the token
        }
        return null;
    }

}
