package com.example.backend.util.awsS3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.buket}")
    private String bucket;

    public String upload(MultipartFile file) throws IllegalAccessException, IOException {
        validateImage(StringUtils.substringAfterLast(file.getOriginalFilename(), "."));
        String fileName = file.getOriginalFilename();
        String fileUrl = "https://" + bucket + "/test" + fileName;
        ObjectMetadata metadata = new ObjectMetadata();

        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);

        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private String makeS3ObjectName(String fileName) {
        return "busanwavr" + UUID.randomUUID() + "." + StringUtils.substringAfterLast(fileName,
                ".");
    }

    private void validateImage(String exName) throws IllegalAccessException {
        List<String> list = new ArrayList<>();
        list.add("jpg");
        list.add("jpeg");
        list.add("gif");
        list.add("png");

        if (!list.contains(exName)) {
            throw new IllegalAccessException("올바른 파일 형식이 아닙니다. (jpg, jpeg, gif, png)");
        }
    }
}
