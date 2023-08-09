package com.example.backend.controller;

import com.example.backend.model.joiner.Joiner;
import com.example.backend.model.joiner.JoinerCustomRepository;
import com.example.backend.model.joiner.JoinerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final JoinerCustomRepository joinerCustomRepository;
    private final JoinerRepository joinerRepository;

    @GetMapping("/testQueryDsl")
    public void test() {
//        List<Joiner> joiners = joinerCustomRepository.findAllByQuerydsl(26L);
        Joiner joiners = joinerRepository.findById(21L).get();
        System.out.println(joiners);
    }
}
