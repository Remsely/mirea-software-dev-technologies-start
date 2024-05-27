package edu.mirea.remselybokgosha.start.post.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostDto {
    private Long id;
    private String author;
    private String title;
    private String content;
    private String image;
    private Integer likeCount;
    private Boolean liked;
}
