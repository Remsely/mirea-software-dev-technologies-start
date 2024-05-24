package edu.mirea.remselybokgosha.start.post.service;

import edu.mirea.remselybokgosha.start.cloud.firebase.FirebaseStorageService;
import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.dto.PostWithCommentsDto;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import edu.mirea.remselybokgosha.start.post.mapper.PostMapper;
import edu.mirea.remselybokgosha.start.post.repository.PostRepository;
import edu.mirea.remselybokgosha.start.user.entity.User;
import edu.mirea.remselybokgosha.start.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final FirebaseStorageService storageService;
    private final PostMapper postMapper;

    @SneakyThrows
    @Transactional
    @Override
    public Post savePost(Post post, MultipartFile image, long userId) {
        User user = findUserById(userId);
        String imageUrl = storageService.uploadPostImage(image);

        post.setUser(user);
        post.setImage(imageUrl);

        return postRepository.save(post);
    }

    @Transactional(readOnly = true)
    @Override
    public PostWithCommentsDto getPost(long postId, long userId) {
        checkUserExist(userId);
        return postMapper.toDtoWithComments(findPostById(postId));
    }

    @Transactional(readOnly = true)
    @Override
    public List<PostDto> getAllPosts(long userId) {
        checkUserExist(userId);
        return postMapper.toDtoList(postRepository.findAll());
    }

    private User findUserById(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
    }

    private Post findPostById(long userId) {
        return postRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Post Not Found"));
    }

    private boolean isUserExist(long userId) {
        return userRepository.existsById(userId);
    }

    private void checkUserExist(long userId) {
        if (!isUserExist(userId)) {
            throw new RuntimeException("User Not Found");
        }
    }
}
