package com._team9.backend.controller;

import com._team9.backend.dto.ForumPostResponse;
import com._team9.backend.dto.ForumThreadResponse;
import com._team9.backend.dto.NewPostRequest;
import com._team9.backend.dto.NewThreadRequest;
import com._team9.backend.entity.ForumPost;
import com._team9.backend.entity.ForumThread;
import com._team9.backend.entity.User;
import com._team9.backend.repository.ForumPostRepository;
import com._team9.backend.repository.ForumThreadRepository;
import com._team9.backend.repository.UserRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/forum")
public class ForumController {

    private final ForumThreadRepository threads;
    private final ForumPostRepository posts;
    private final UserRepository users;

    public ForumController(ForumThreadRepository threads,
                           ForumPostRepository posts,
                           UserRepository users) {
        this.threads = threads;
        this.posts = posts;
        this.users = users;
    }

    @GetMapping("/threads")
    public List<ForumThreadResponse> listThreads() {
        return threads.findByHiddenFalseOrderByCreatedAtDesc().stream()
                .map(ForumThreadResponse::fromEntity)
                .toList();
    }

    @PostMapping("/threads")
    @ResponseStatus(HttpStatus.CREATED)
    public ForumThreadResponse createThread(@Valid @RequestBody NewThreadRequest req,
                                            Authentication auth) {
        User author = users.findByEmail(auth.getName()).orElseThrow();

        ForumThread thread = new ForumThread();
        thread.setTitle(req.title());
        thread.setAuthor(author);
        threads.save(thread);

        ForumPost first = new ForumPost();
        first.setThread(thread);
        first.setAuthor(author);
        first.setBody(req.body());
        posts.save(first);

        return ForumThreadResponse.fromEntity(thread);
    }

    @GetMapping("/threads/{id}/posts")
    public List<ForumPostResponse> listPosts(@PathVariable Long id) {
        return posts.findByThreadIdAndHiddenFalseOrderByCreatedAtAsc(id).stream()
                .map(ForumPostResponse::fromEntity)
                .toList();
    }

    @PostMapping("/threads/{id}/posts")
    @ResponseStatus(HttpStatus.CREATED)
    public ForumPostResponse createPost(@PathVariable Long id,
                                        @Valid @RequestBody NewPostRequest req,
                                        Authentication auth) {
        ForumThread thread = threads.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Thread not found"));
        User author = users.findByEmail(auth.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        ForumPost post = new ForumPost();
        post.setThread(thread);
        post.setAuthor(author);
        post.setBody(req.body());

        if (req.parentPostId() != null) {
            ForumPost parent = posts.findById(req.parentPostId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parent post not found"));
            if (!parent.getThread().getId().equals(id)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parent post is in a different thread");
            }
            post.setParentPost(parent);
        }

        return ForumPostResponse.fromEntity(posts.save(post));
    }
}

