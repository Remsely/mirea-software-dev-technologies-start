package edu.mirea.remselybokgosha.start.post.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostWithCommentsDto {
    private Long id;
    private String authorEmail;
    private String title;
    private String content;
    private String image;
    private Integer likeCount;
    private List<CommentDto> comments;
}
