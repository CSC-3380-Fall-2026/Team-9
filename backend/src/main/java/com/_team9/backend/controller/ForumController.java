package com._team9.backend.controller;

import com._team9.backend.dto.ForumThreadResponse;
import com._team9.backend.repository.ForumThreadRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
public class ForumController {

    private final ForumThreadRepository forumThreadRepository;

    public ForumController(ForumThreadRepository forumThreadRepository) {
        this.forumThreadRepository = forumThreadRepository;
    }

    @GetMapping("/api/threads")
    public List<ForumThreadResponse> listThreads() {
        return forumThreadRepository.findByHiddenFalseOrderByCreatedAtDesc()
            .stream()
            .map(ForumThreadResponse::fromEntity)
            .toList();
    }

}
