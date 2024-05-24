package edu.mirea.remselybokgosha.start.post.entity;

import edu.mirea.remselybokgosha.start.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserAndPostPrimaryKey {
    private User user;
    private Post post;
}
