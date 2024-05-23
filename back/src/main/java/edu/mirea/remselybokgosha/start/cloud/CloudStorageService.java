package edu.mirea.remselybokgosha.start.cloud;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudStorageService {
    String uploadPostImage(MultipartFile file) throws IOException;
}
