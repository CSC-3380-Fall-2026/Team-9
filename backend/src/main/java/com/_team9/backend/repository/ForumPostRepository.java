package com._team9.backend.repository;

import com._team9.backend.entity.ForumPost;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    List<ForumPost> findByThreadIdAndHiddenFalseOrderByCreatedAtAsc(Long threadId);
}
