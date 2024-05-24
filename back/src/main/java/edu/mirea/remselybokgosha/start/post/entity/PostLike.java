package edu.mirea.remselybokgosha.start.post.entity;

import edu.mirea.remselybokgosha.start.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post_like")
@IdClass(UserAndPostPrimaryKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostLike {
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private Post post;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private User user;
}
