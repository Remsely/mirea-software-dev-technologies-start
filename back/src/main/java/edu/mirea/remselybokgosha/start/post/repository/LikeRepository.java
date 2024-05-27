package edu.mirea.remselybokgosha.start.post.repository;

import edu.mirea.remselybokgosha.start.post.entity.PostLike;
import edu.mirea.remselybokgosha.start.post.entity.UserAndPostPrimaryKey;
import edu.mirea.remselybokgosha.start.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<PostLike, UserAndPostPrimaryKey> {
    List<PostLike> findByUser(User user);
}
