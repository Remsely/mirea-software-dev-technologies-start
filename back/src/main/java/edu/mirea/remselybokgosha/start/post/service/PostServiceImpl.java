package edu.mirea.remselybokgosha.start.post.service;

import edu.mirea.remselybokgosha.start.cloud.firebase.FirebaseStorageService;
import edu.mirea.remselybokgosha.start.post.dto.CommentCreationDto;
import edu.mirea.remselybokgosha.start.post.dto.CommentDto;
import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.dto.PostWithCommentsDto;
import edu.mirea.remselybokgosha.start.post.entity.Comment;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import edu.mirea.remselybokgosha.start.post.entity.PostLike;
import edu.mirea.remselybokgosha.start.post.entity.UserAndPostPrimaryKey;
import edu.mirea.remselybokgosha.start.post.mapper.CommentMapper;
import edu.mirea.remselybokgosha.start.post.mapper.PostMapper;
import edu.mirea.remselybokgosha.start.post.repository.CommentRepository;
import edu.mirea.remselybokgosha.start.post.repository.LikeRepository;
import edu.mirea.remselybokgosha.start.post.repository.PostRepository;
import edu.mirea.remselybokgosha.start.user.entity.User;
import edu.mirea.remselybokgosha.start.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private final FirebaseStorageService storageService;
    private final PostMapper postMapper;
    private final CommentMapper commentMapper;

    @Transactional
    @SneakyThrows
    @Override
    public PostDto savePost(Post post, MultipartFile image, long userId) {
        User user = findUserById(userId);
        String imageUrl = storageService.uploadPostImage(image);

        post.setUser(user);
        post.setImage(imageUrl);

        return postMapper.toDto(postRepository.save(post), false);
    }

    @Transactional(readOnly = true)
    @Override
    public PostWithCommentsDto getPost(long postId, long userId) {
        User user = findUserById(userId);
        Post post = findPostById(postId);
        return postMapper.toDtoWithComments(post, isLikeExist(post, user));
    }

    @Transactional(readOnly = true)
    @Override
    public List<PostDto> getAllPosts(long userId) {
        User user = findUserById(userId);
        List<Post> posts = postRepository.findAll();

        List<PostLike> likes = likeRepository.findByUser(user);
        Set<Long> likedPostIds = getLikedPostsIds(likes);

        return posts.stream()
                .map(post -> {
                    boolean isLiked = likedPostIds.contains(post.getId());
                    return postMapper.toDto(post, isLiked);
                }).toList();
    }

    @Transactional
    @Override
    public void savePostLike(long postId, long userId) {
        User user = findUserById(userId);
        Post post = findPostById(postId);

        checkLikeNotExist(post, user);

        likeRepository.save(PostLike.builder()
                .post(post)
                .user(user)
                .build()
        );
    }

    @Transactional
    @Override
    public void removePostLike(long postId, long userId) {
        User user = findUserById(userId);
        Post post = findPostById(postId);

        checkLikeExist(post, user);

        likeRepository.deleteById(UserAndPostPrimaryKey.builder()
                .post(post)
                .user(user)
                .build()
        );
    }

    @Override
    public CommentDto saveComment(CommentCreationDto commentDto, long postId, long userId) {
        User user = findUserById(userId);
        Post post = findPostById(postId);

        Comment comment = commentMapper.toEntity(commentDto);
        comment.setUser(user);
        comment.setPost(post);

        return commentMapper.toDto(commentRepository.save(comment));
    }

    private User findUserById(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
    }

    private Post findPostById(long userId) {
        return postRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Post Not Found"));
    }

    private boolean isLikeExist(Post post, User user) {
        return likeRepository.existsById(
                UserAndPostPrimaryKey.builder()
                        .post(post)
                        .user(user)
                        .build()
        );
    }

    private void checkLikeExist(Post post, User user) {
        if (!isLikeExist(post, user)) {
            throw new RuntimeException("Like Not Found");
        }
    }

    private void checkLikeNotExist(Post post, User user) {
        if (isLikeExist(post, user)) {
            throw new RuntimeException("Like Already Exists");
        }
    }

    private Set<Long> getLikedPostsIds(List<PostLike> likedPosts) {
        return likedPosts.stream()
                .map(like -> like.getPost().getId())
                .collect(Collectors.toSet());
    }
}
