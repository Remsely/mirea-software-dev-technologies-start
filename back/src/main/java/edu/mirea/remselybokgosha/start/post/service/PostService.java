package edu.mirea.remselybokgosha.start.post.service;

import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.dto.PostWithCommentsDto;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    Post savePost(Post post, MultipartFile image, long userId);

    PostWithCommentsDto getPost(long postId, long userId);

    List<PostDto> getAllPosts(long userId);
}
