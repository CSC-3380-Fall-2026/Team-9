package com._team9.backend.dto;

import com._team9.backend.entity.ForumThread;
import java.time.Instant;

public record ForumThreadResponse(
    Long id,
    String title,
    String author,
    Instant createdAt
) {

    public static ForumThreadResponse fromEntity(ForumThread thread) {
        return new ForumThreadResponse(
            thread.getId(),
            thread.getTitle(),
            thread.getAuthor().getUsername(),
            thread.getCreatedAt()
        );
    }
    

}
