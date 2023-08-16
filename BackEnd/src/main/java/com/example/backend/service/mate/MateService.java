package com.example.backend.service.mate;

import com.example.backend.dto.mate.MateDetailDto;
import com.example.backend.dto.mate.MateInfoDetailDto;
import com.example.backend.dto.mate.MateInfoForListDto;
import com.example.backend.dto.mate.MateJoinerDto;
import com.example.backend.dto.mate.MateListDto;
import com.example.backend.dto.mate.MateRegistDto;
import com.example.backend.dto.mate.MateRegistDto.Request;
import com.example.backend.dto.mate.MateUpdateDto;
import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerRepository;
import com.example.backend.model.mate.Mate;
import com.example.backend.model.mate.MateRepository;
import com.example.backend.model.tour.Tour;
import com.example.backend.model.tour.TourRepository;
import com.example.backend.model.tourimage.TourImage;
import com.example.backend.model.tourimage.TourImageRepository;
import com.example.backend.model.user.User;
import com.example.backend.model.user.UserRepository;
import com.example.backend.util.image.ImageUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MateService {

    private final MateRepository mateRepository;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final JoinerRepository joinerRepository;
    private final TourImageRepository tourImageRepository;
    private final ImageUtil imageUtil;

    @Transactional
    public MateRegistDto.Response registMateService(Request request, User user) {
        Tour tour = tourRepository.findById(request.getTourId()).get();
        int joinMember = Math.toIntExact(joinerRepository.countByTour(tour));

        if (joinMember == 0) {
            throw new IllegalArgumentException("해당 투어의 참여자 수가 이상합니다. 다시 요청해주세요");
        }

        Mate mate = new Mate(request, tour, user, joinMember);
        mateRepository.save(mate);
        MateRegistDto.Response response = new MateRegistDto.Response(mate.getId());
        return response;
    }

    public MateDetailDto.Response getDetailMate(Long mateId) {
        Mate mate = mateRepository.findById(mateId).get();
        User user = userRepository.findById(mate.getUserId()).get();
        Tour tour = tourRepository.findById(mate.getTourId()).get();
        MateInfoDetailDto mateInfoDetailDto = new MateInfoDetailDto(mate, tour.getTitle(), user);
        List<Joiner> joiners = joinerRepository.findAllByTourId(mate.getTourId());
        List<MateJoinerDto> mateInfoDetailDtos = new ArrayList<>();

        if (joiners.size() == 0) {
            throw new IllegalArgumentException("Mate 상세 데이터의 joiner의 수가 0일 수 없습니다.");
        }

        for (Joiner joiner : joiners) {
            mateInfoDetailDtos.add(new MateJoinerDto(joiner));
        }

        MateDetailDto.Response response = new MateDetailDto.Response();
        response.setMate(mateInfoDetailDto);
        response.setJoiners(mateInfoDetailDtos);
        return response;
    }

    public MateListDto.Response getMateList(Pageable pageable) {
        List<Mate> mates = mateRepository.findAllByOrderByIdDesc(pageable);
        List<MateInfoForListDto> mateInfoForListDtos = new ArrayList<>();
        for (Mate mate : mates) {
            Tour tour = tourRepository.findById(mate.getTourId()).get();
            List<TourImage> tourImageList = tourImageRepository.findAllByTourId(tour.getId());
            List<String> tourImageUrls = new ArrayList<>();
            if(tourImageList == null){
                mateInfoForListDtos.add(new MateInfoForListDto(mate, tour, null));
            }
            imageUtil.tourImageUrlList(tour.getId(), tourImageUrls);
            mateInfoForListDtos.add(new MateInfoForListDto(mate, tour, tourImageUrls));
        }

        return new MateListDto.Response(mateInfoForListDtos);
    }

    @Transactional
    public void updateMate(MateUpdateDto.Request request, Long mateId, User user) {
        Mate mate = mateRepository.findById(mateId).get();

        if (mate.getUserId() != user.getId()) {
            throw new IllegalArgumentException("수정할 메이트 정보와 사용자가 일치하지 않습니다.");
        }

        if (Objects.equals(mate.getContent(), request.getContent()) && Objects.equals(
                mate.getTitle(), request.getTitle())) {
            throw new IllegalArgumentException("이전 데이터와 같습니다! 다시 한번 데이터를 확인해주세요.");
        }

        mate.updateMate(request);
        mateRepository.save(mate);
    }

    @Transactional
    public void deleteMate(Long mateId, User user) {
        Mate mate = mateRepository.findById(mateId).get();

        if (mate.getUserId() != user.getId()) {
            throw new IllegalArgumentException("삭제할 메이트 정보와 사용자가 일치하지 않습니다.");
        }

        mateRepository.deleteById(mateId);
    }
}
