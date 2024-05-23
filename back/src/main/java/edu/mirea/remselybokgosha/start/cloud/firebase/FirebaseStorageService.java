package edu.mirea.remselybokgosha.start.cloud.firebase;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import edu.mirea.remselybokgosha.start.cloud.CloudStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FirebaseStorageService implements CloudStorageService {
    private static final String POST_IMAGES_FOLDER = "post-images/";

    @Override
    public String uploadPostImage(MultipartFile file) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket();
        String fileName = POST_IMAGES_FOLDER + UUID.randomUUID() + "-" + file.getOriginalFilename();
        Blob blob = bucket.create(fileName, file.getInputStream(), file.getContentType());
        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));
        return blob.getMediaLink();
    }
}
