package com.example.backend.service;

import com.example.backend.dto.MateDetailDto;
import com.example.backend.dto.MateDetailDto.Response;
import com.example.backend.dto.MateInfoDetailDto;
import com.example.backend.dto.MateInfoForListDto;
import com.example.backend.dto.MateJoinerDto;
import com.example.backend.dto.MateListDto;
import com.example.backend.dto.MateRegistDto;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.mate.Mate;
import com.example.backend.model.mate.MateRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.user.User;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public MateDetailDto.Response getDetailMate(Long mateId){
        Mate mate = mateRepository.findById(mateId).get();
        MateInfoDetailDto mateInfoDetailDto = new MateInfoDetailDto(mate);
        List<Joiner> joiners = joinerRepository.findAllByTourId(mate.getTourId());
        List<MateJoinerDto> mateInfoDetailDtos = new ArrayList<>();

        if(joiners.size() == 0){
            throw new IllegalArgumentException("Mate 상세 데이터의 joiner의 수가 0일 수 없습니다.");
        }

        for(Joiner joiner : joiners){
            mateInfoDetailDtos.add(new MateJoinerDto(joiner));
        }

        MateDetailDto.Response response = new MateDetailDto.Response();
        response.setMate(mateInfoDetailDto);
        response.setJoiners(mateInfoDetailDtos);
        return response;
    }

    public MateListDto.Response getMateList(Pageable pageable){
        Page<Mate> mates = mateRepository.findAllByOrderById(pageable);
        List<MateInfoForListDto> mateInfoForListDtos = new ArrayList<>();

        for(Mate mate : mates){
            mateInfoForListDtos.add(new MateInfoForListDto(mate));
        }

        return new MateListDto.Response(mateInfoForListDtos);
    }
}
