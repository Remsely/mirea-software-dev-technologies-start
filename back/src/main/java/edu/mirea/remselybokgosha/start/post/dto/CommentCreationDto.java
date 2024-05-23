package edu.mirea.remselybokgosha.start.post.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentCreationDto {
    private String content;
}
