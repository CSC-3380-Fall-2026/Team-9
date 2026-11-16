package com._team9.backend.dto;

import com._team9.backend.entity.ForumPost;
import java.time.Instant;


public record ForumPostResponse(
        Long id,
        String body,
        String authorName,
        Long parentPostId,
        Instant createdAt
) {

    public static ForumPostResponse fromEntity(ForumPost post) {
        return new ForumPostResponse(
                post.getId(),
                post.getBody(),
                post.getAuthor().getUsername(),
                post.getParentPost() != null ? post.getParentPost().getId() : null,
                post.getCreatedAt());
    }
}