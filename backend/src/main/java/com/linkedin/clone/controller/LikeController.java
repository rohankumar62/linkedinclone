package com.linkedin.clone.controller;

import com.linkedin.clone.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/{postId}/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping
    public ResponseEntity<Void> toggleLike(@PathVariable Long postId, Authentication authentication) {
        String email = authentication.getName();
        likeService.toggleLike(postId, email);
        return ResponseEntity.ok().build();
    }
}
