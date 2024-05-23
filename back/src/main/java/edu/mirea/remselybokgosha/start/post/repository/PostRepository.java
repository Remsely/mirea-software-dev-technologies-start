package edu.mirea.remselybokgosha.start.post.repository;

import edu.mirea.remselybokgosha.start.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
