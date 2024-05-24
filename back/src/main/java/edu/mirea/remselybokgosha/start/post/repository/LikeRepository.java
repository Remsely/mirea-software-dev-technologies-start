package edu.mirea.remselybokgosha.start.post.repository;

import edu.mirea.remselybokgosha.start.post.entity.PostLike;
import edu.mirea.remselybokgosha.start.post.entity.UserAndPostPrimaryKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<PostLike, UserAndPostPrimaryKey> {
}
