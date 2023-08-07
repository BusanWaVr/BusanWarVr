package com.example.backend.service.user;

import com.example.backend.model.follower.Follower;
import com.example.backend.model.follower.FollowerRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import java.util.List;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInfoService {

    private final UserRepository userRepository;
    private final FollowerRepository followerRepository;


    @Transactional
    public boolean userFollow(Long userId, Long guideId) {

        User user = userRepository.findById(userId).get();
        User guide = userRepository.findById(guideId).get();

        if (user.getType().toString() == "GUIDE") {
            throw new IllegalArgumentException("가이드는 팔로잉할 수 없습니다.");
        }

        if (guide.getType().toString() == "USER") {
            throw new IllegalArgumentException("유저를 팔로우할 수 없습니다.");
        }

        if (followerRepository.existsByUserAndGuide(user, guide)) {
            followerDelete(user, guide);
            return false;
        } else {
            followerCreate(user, guide);
            return true;
        }
    }

    public void followerCreate(User user, User guide) {
        Follower follower = new Follower();
        follower.setUser(user);
        follower.setGuide(guide);
        followerRepository.save(follower);
    }

    public void followerDelete(User user, User guide) {
        followerRepository.deleteByUserAndGuide(user, guide);
    }

    public boolean checkIsFollowed(User user, Long guideId) {
        List<Follower> followerList = followerRepository.findAllByGuideId(guideId);
        for (Follower follower : followerList) {
            if (follower.getUser().getId() == user.getId()) {
                return true;
            }
        }
        return false;
    }
}
