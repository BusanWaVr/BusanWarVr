package com.example.backend.service.tour;

import com.example.backend.dto.tour.TourReservationCancelDto;
import com.example.backend.dto.tour.TourReservationDto;
import com.example.backend.model.enums.AuthType;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.wish.Wish;
import com.example.backend.model.wish.WishRepository;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private final JoinerRepository joinerRepository;
    private final WishRepository wishRepository;


    public void tourReservation(Long tourId, User user) {
        Tour tour = tourRepository.findById(tourId).get();
        TourReservationDto tourReservationDto = new TourReservationDto(tour);
        if (tour.isCanceled() || tour.isEnded()) {
            throw new IllegalArgumentException("이미 종료되었거나 취소된 투어입니다.");
        }
        if (tour.getMaxMember() <= tour.getCurrentMember()) {
            throw new IllegalArgumentException("인원이 모두 모여 예약이 불가능 합니다.");
        }
        List<Joiner> joiners = joinerRepository.findAllByTourId(tourId);
        for (Joiner joiner : joiners) {
            if (joiner.getUser().getId() == user.getId()) {
                throw new IllegalArgumentException("이미 예약된 고객입니다");
            }
        }
        Joiner newJoiner = new Joiner(tour, user, new Date());
        joinerRepository.save(newJoiner);
        tour = tourReservationDto.upCurrentMember(tour);
        tourRepository.save(tour);
    }

    public boolean tourWish(Long tourId, User user) throws IllegalAccessException {
        List<Wish> wishList = wishRepository.findAllByUserId(user.getId());
        if (user.getType() != AuthType.USER) {
            throw new IllegalAccessException("가이드는 찜하기를 할 수 없습니다.");
        }
        boolean isUnWished = true;
        for (Wish wish : wishList) {
            // 이미 찜 되어있으면 찜 취소
            if (wish.getTour().getId() == tourId) {
                wishRepository.delete(wish);
                isUnWished = false;
                return false;
            }
        }
        // 찜하기 안 되어 있으면 찜
        if (isUnWished) {
            Tour tour = tourRepository.findById(tourId).get();
            Wish wish = new Wish(tour, user.getId());
            wishRepository.save(wish);
        }
        return true;
    }

    public void tourReservationCancel(Long tourId, User user) throws IllegalArgumentException {
        Tour tour = tourRepository.findById(tourId).get();
        TourReservationCancelDto tourReservationCancelDto = new TourReservationCancelDto(tour);
        List<Joiner> joiners = joinerRepository.findAllByTourId(tourId);
        boolean isNotExist = true;
        for (Joiner joiner : joiners) {
            if (joiner.getUser().getId() == user.getId()) {
                joinerRepository.deleteById(joiner.getId());
                tour = tourReservationCancelDto.downCurrentMember(tour);
                tourRepository.save(tour);
                isNotExist = false;
            }
        }
        if (isNotExist) {
            throw new IllegalArgumentException("예약 고객만 예약 취소가 가능합니다.");
        }
    }

    public void tourCancel(Long tourId, User user)
            throws IllegalAccessException {
        Tour tour = tourRepository.findById(tourId).get();
        if ((user.getType() == AuthType.GUIDE) && (tour.getUserId() == user.getId())) {
            tour.setCanceled(true);
            tourRepository.save(tour);
        } else if (user.getType() == AuthType.USER) {
            throw new IllegalAccessException("가이드만 투어 취소 가능합니다.");
        } else {
            throw new IllegalAccessException("해당 투어의 작성자 가이드만 투어 취소 가능합니다.");
        }
    }

    public void tourTerminate(Long tourId, User user) throws IllegalAccessException {
        Tour tour = tourRepository.findById(tourId).get();
        if ((user.getType() == AuthType.GUIDE) && (tour.getUserId() == user.getId())) {
            tour.setEnded(true);
            tourRepository.save(tour);
        } else if (user.getType() == AuthType.USER) {
            throw new IllegalAccessException("가이드만 투어 취소 가능합니다.");
        } else {
            throw new IllegalAccessException("해당 투어의 작성자 가이드만 투어 취소 가능합니다.");
        }
    }
}
