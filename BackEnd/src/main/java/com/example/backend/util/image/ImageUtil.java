package com.example.backend.util.image;

import com.example.backend.model.image.Image;
import com.example.backend.model.image.ImageRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.util.awsS3.S3Uploader;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ImageUtil {
    private final S3Uploader s3Uploader;
    private final ImageRepository imageRepository;
    private final TourImageRepository tourImageRepository;

    public Image saveImage(MultipartFile imageFile) throws IOException, IllegalAccessException {
        String fileUrl = s3Uploader.upload(imageFile);
        Image image = new Image(fileUrl);
        imageRepository.save(image);
        return image;
    }

    public void tourImageUrlList(Long tourId, List<String> tourImageUrls) {
        List<TourImage> tourImages = tourImageRepository.findAllByTourId(tourId);
        if (tourImages != null) {
            for (TourImage tourImage : tourImages) {
                tourImageUrls.add(tourImage.getImage().getUrl());
            }
        }
    }
}
