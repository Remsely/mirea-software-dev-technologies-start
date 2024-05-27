package edu.mirea.remselybokgosha.start.post.mapper;

import edu.mirea.remselybokgosha.start.post.dto.PostDto;
import edu.mirea.remselybokgosha.start.post.dto.PostWithCommentsDto;
import edu.mirea.remselybokgosha.start.post.entity.Post;
import edu.mirea.remselybokgosha.start.post.entity.PostLike;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Scope("prototype")
@RequiredArgsConstructor
public class PostMapper {
    private final CommentMapper commentMapper;

    public PostDto toDto(Post post, boolean liked) {
        List<PostLike> likes = post.getLikes();
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .image(post.getImage())
                .author(post.getUser().getUsername())
                .liked(liked)
                .likeCount(likes == null ? 0 : likes.size())
                .build();
    }

    public PostWithCommentsDto toDtoWithComments(Post post, boolean liked) {
        List<PostLike> likes = post.getLikes();
        return PostWithCommentsDto.builder()
                .id(post.getId())
                .author(post.getUser().getUsername())
                .title(post.getTitle())
                .content(post.getContent())
                .image(post.getImage())
                .likeCount(likes == null ? 0 : likes.size())
                .liked(liked)
                .comments(commentMapper.toDtoList(post.getComments()))
                .build();
    }
}
