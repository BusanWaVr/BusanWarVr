package com.example.backend.service;

import com.example.backend.dto.SignUpDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.awsS3.S3Uploader;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;
    @Transactional
    public void signup(SignUpDto.Reqeust reqeust) throws IOException, IllegalAccessException {
        String fileUrl = s3Uploader.upload(reqeust.getProfileImg());
        System.out.println(fileUrl);
    }
}
