package com.example.backend.service;

import com.example.backend.dto.MateRegistDto;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.mate.Mate;
import com.example.backend.model.mate.MateRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MateService {

    private final MateRepository mateRepository;
    private final TourRepository tourRepository;
    private final JoinerRepository joinerRepository;

    @Transactional
    public void registMateService(MateRegistDto.Request request, User user){
        Tour tour = tourRepository.findById(request.getTourId()).get();
        int joinMember = Math.toIntExact(joinerRepository.countByTour(tour));

        if(joinMember == 0){
            throw new IllegalArgumentException("해당 투어의 참여자 수가 이상합니다. 다시 요청해주세요");
        }

        Mate mate = new Mate(request, tour, user, joinMember);
        mateRepository.save(mate);
    }
}
