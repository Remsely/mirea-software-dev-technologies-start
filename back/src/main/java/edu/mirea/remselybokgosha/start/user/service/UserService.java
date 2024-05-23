package edu.mirea.remselybokgosha.start.user.service;

import edu.mirea.remselybokgosha.start.user.entity.User;

public interface UserService {
    User findUserByEmail(String email);

    User addUser(User user);

    boolean userExistByEmail(String email);
}
