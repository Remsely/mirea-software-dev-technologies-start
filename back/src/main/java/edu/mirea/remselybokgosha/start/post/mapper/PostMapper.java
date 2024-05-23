package edu.mirea.remselybokgosha.start.post.mapper;

import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.dto.PostWithCommentsDto;
import edu.mirea.remselybokgosha.start.post.entity.Comment;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@Scope("prototype")
@RequiredArgsConstructor
public class PostMapper {
    private final CommentMapper commentMapper;

    public PostDto toDto(Post post, int likeCount) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .image(post.getImage())
                .author(post.getUser().getUsername())
                .likeCount(likeCount)
                .build();
    }

    public PostDto toDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .image(post.getImage())
                .author(post.getUser().getUsername())
                .likeCount(0)
                .build();
    }

    public PostWithCommentsDto toDto(Post post, List<Comment> comments, int likeCount) {
        return PostWithCommentsDto.builder()
                .id(post.getId())
                .author(post.getUser().getUsername())
                .title(post.getTitle())
                .content(post.getContent())
                .image(post.getImage())
                .likeCount(likeCount)
                .comments(commentMapper.toDtoList(comments))
                .build();
    }

    public List<PostDto> toDtoList(Map<Post, Integer> postsWithLikes) {
        return postsWithLikes.keySet().stream()
                .map(post -> this.toDto(post, postsWithLikes.get(post)))
                .toList();
    }
}
