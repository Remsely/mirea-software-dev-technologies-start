package edu.mirea.remselybokgosha.start.post.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.mirea.remselybokgosha.start.post.dto.CommentCreationDto;
import edu.mirea.remselybokgosha.start.post.dto.CommentDto;
import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.dto.PostWithCommentsDto;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import edu.mirea.remselybokgosha.start.post.service.PostService;
import edu.mirea.remselybokgosha.start.security.auth.principal.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final ObjectMapper objectMapper;

    @SneakyThrows
    @PostMapping
    public PostDto createPost(@AuthenticationPrincipal UserPrincipal userPrincipal,
                              @RequestParam("image") MultipartFile image,
                              @RequestParam("json") String json) {
        long userId = userPrincipal.getUserId();
        Post post = objectMapper.readValue(json, Post.class);
        return postService.savePost(post, image, userId);
    }

    @GetMapping("/{id}")
    public PostWithCommentsDto getPost(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                       @PathVariable Long id) {
        long userId = userPrincipal.getUserId();
        return postService.getPost(id, userId);
    }

    @GetMapping
    public List<PostDto> getPosts(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        long userId = userPrincipal.getUserId();
        return postService.getAllPosts(userId);
    }

    @PutMapping("/{id}/likes")
    public PostWithCommentsDto putLike(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id) {
        long userId = userPrincipal.getUserId();
        postService.savePostLike(id, userId);
        return postService.getPost(id, userId);
    }

    @DeleteMapping("/{id}/likes")
    public PostWithCommentsDto deleteLike(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id) {
        long userId = userPrincipal.getUserId();
        postService.removePostLike(id, userId);
        return postService.getPost(id, userId);
    }

    @PostMapping("/{id}/comments")
    public CommentDto createComment(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                    @Valid @RequestBody CommentCreationDto commentDto,
                                    @PathVariable Long id) {
        long userId = userPrincipal.getUserId();
        return postService.saveComment(commentDto, id, userId);
    }
}
