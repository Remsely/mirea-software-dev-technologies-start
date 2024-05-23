package edu.mirea.remselybokgosha.start.security.auth.service;

import edu.mirea.remselybokgosha.start.security.auth.dto.LoginRequest;
import edu.mirea.remselybokgosha.start.security.auth.dto.LoginResponse;
import edu.mirea.remselybokgosha.start.security.auth.jwt.JwtIssuer;
import edu.mirea.remselybokgosha.start.security.auth.principal.UserPrincipal;
import edu.mirea.remselybokgosha.start.user.entity.User;
import edu.mirea.remselybokgosha.start.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @Override
    public LoginResponse login(LoginRequest request) {
        final String email = request.getEmail();
        if (!userService.userExistByEmail(email)) {
            log.info("Login failed. No user found with email {}!", email);
            return LoginResponse.builder()
                    .accessToken(null)
                    .build();
        }
        return getToken(request);
    }

    @Override
    public LoginResponse register(LoginRequest request) {
        userService.addUser(User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build());
        return getToken(request);
    }

    private LoginResponse getToken(LoginRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        List<String> roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail(), roles);

        log.info("Login successful. User email : {}.", request.getEmail());
        return LoginResponse.builder()
                .accessToken(token)
                .build();
    }
}
