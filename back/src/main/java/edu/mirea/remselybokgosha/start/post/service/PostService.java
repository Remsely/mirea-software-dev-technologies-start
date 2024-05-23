package edu.mirea.remselybokgosha.start.post.service;

import edu.mirea.remselybokgosha.start.post.entity.Post;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {
    Post savePost(Post post, MultipartFile image, long userId);
}
