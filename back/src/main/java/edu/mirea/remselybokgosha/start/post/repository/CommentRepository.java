package edu.mirea.remselybokgosha.start.post.repository;

import edu.mirea.remselybokgosha.start.post.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
