package edu.mirea.remselybokgosha.start.post.mapper;

import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.dto.PostWithCommentsDto;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Scope("prototype")
@RequiredArgsConstructor
public class PostMapper {
    private final CommentMapper commentMapper;

    public PostDto toDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .image(post.getImage())
                .author(post.getUser().getUsername())
                .likeCount(post.getLikes().size())
                .build();
    }

    public PostWithCommentsDto toDtoWithComments(Post post) {
        return PostWithCommentsDto.builder()
                .id(post.getId())
                .author(post.getUser().getUsername())
                .title(post.getTitle())
                .content(post.getContent())
                .image(post.getImage())
                .likeCount(post.getLikes().size())
                .comments(commentMapper.toDtoList(post.getComments()))
                .build();
    }

    public List<PostDto> toDtoList(List<Post> posts) {
        return posts.stream()
                .map(this::toDto)
                .toList();
    }
}
