package edu.mirea.remselybokgosha.start.post.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import edu.mirea.remselybokgosha.start.post.mapper.PostMapper;
import edu.mirea.remselybokgosha.start.post.service.PostService;
import edu.mirea.remselybokgosha.start.security.auth.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final ObjectMapper objectMapper;
    private final PostMapper postMapper;

    @SneakyThrows
    @PostMapping
    public PostDto createPost(@AuthenticationPrincipal UserPrincipal userPrincipal,
                              @RequestParam("image") MultipartFile image,
                              @RequestParam("json") String json) {
        long userId = userPrincipal.getUserId();
        Post post = objectMapper.readValue(json, Post.class);
        return postMapper.toDto(postService.savePost(post, image, userId));
    }
}
