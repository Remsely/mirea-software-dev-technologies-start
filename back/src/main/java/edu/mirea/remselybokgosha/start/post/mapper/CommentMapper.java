package edu.mirea.remselybokgosha.start.post.mapper;

import edu.mirea.remselybokgosha.start.post.dto.CommentCreationDto;
import edu.mirea.remselybokgosha.start.post.dto.CommentDto;
import edu.mirea.remselybokgosha.start.post.entity.Comment;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Scope("prototype")
public class CommentMapper {
    public CommentDto toDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .authorEmail(comment.getUser().getEmail())
                .build();
    }

    public List<CommentDto> toDtoList(List<Comment> comments) {
        return comments.stream()
                .map(this::toDto)
                .toList();
    }

    public Comment toEntity(CommentCreationDto dto) {
        return Comment.builder()
                .content(dto.getContent())
                .build();
    }
}
