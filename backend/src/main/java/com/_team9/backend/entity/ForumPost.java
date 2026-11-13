package com._team9.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "forum_posts")
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "thread_id")
    private ForumThread thread;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    @Column(nullable = false, length = 1000)
    private String body;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    
    @Column(nullable = false)
    private boolean hidden = false;

    public ForumPost() {}
    
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    public Long getId() { return id; }
    public ForumThread getThread() { return thread; }
    public void setThread(ForumThread thread) { this.thread = thread; }
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public Instant getCreatedAt() { return createdAt; }
    public boolean isHidden() { return hidden; }
    public void setHidden(boolean hidden) { this.hidden = hidden; }
}
