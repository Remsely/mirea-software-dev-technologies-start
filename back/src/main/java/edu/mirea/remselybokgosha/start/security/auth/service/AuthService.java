package edu.mirea.remselybokgosha.start.security.auth.service;

import edu.mirea.remselybokgosha.start.security.auth.dto.LoginRequest;
import edu.mirea.remselybokgosha.start.security.auth.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);

    LoginResponse register(LoginRequest request);
}
