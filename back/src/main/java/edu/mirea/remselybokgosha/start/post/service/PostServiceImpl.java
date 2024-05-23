package edu.mirea.remselybokgosha.start.post.service;

import edu.mirea.remselybokgosha.start.cloud.firebase.FirebaseStorageService;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import edu.mirea.remselybokgosha.start.post.repository.PostRepository;
import edu.mirea.remselybokgosha.start.user.entity.User;
import edu.mirea.remselybokgosha.start.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final FirebaseStorageService storageService;

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

    private User findUserById(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
    }
}
