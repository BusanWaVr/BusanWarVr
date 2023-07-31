package com.example.backend.controller;

import com.example.backend.dto.MateDetailDto;
import com.example.backend.dto.MateListDto;
import com.example.backend.dto.MateRegistDto;
import com.example.backend.dto.MateUpdateDto;
import com.example.backend.dto.Response;
import com.example.backend.model.user.User;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MateController {

    private final MateService mateService;

    @PostMapping("/mate")
    public Response<MateRegistDto.Response> registMate(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody MateRegistDto.Request request) {
        User user = userDetails.getUser();

        if (user.getType().toString() == "GUIDE") {
            throw new IllegalArgumentException("가이드는 mate 등록을 할 수 없습니다.");
        }

        MateRegistDto.Response response = mateService.registMateService(request,
                userDetails.getUser());
        return new Response<>("200", "성공적으로 메이트 등록 되었습니다!", response);
    }

    @GetMapping("/mate/{mateId}")
    public Response<MateDetailDto.Response> getMateDetail(@PathVariable Long mateId) {
        MateDetailDto.Response response = mateService.getDetailMate(mateId);
        return new Response<>("200", "성공적으로 메이트 상세를 가져왔습니다.", response);
    }

    @GetMapping("/mate")
    public Response<MateListDto.Response> getMateList(
            @PageableDefault(size = 6) Pageable pageable) {
        MateListDto.Response response = mateService.getMateList(pageable);
        return new Response<>("200", "성곡적으로 메이트 리스트를 불러왔습니다.", response);
    }

    @PutMapping("/mate/{mateId}")
    public Response putMate(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long mateId, @RequestBody MateUpdateDto.Request request) {
        mateService.updateMate(request, mateId, userDetails.getUser());
        return new Response<>("200", "성곡적으로 메이트 정보를 변경하였습니다.", null);
    }
}
