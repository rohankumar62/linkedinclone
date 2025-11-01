package com.linkedin.clone.controller;

import com.linkedin.clone.dto.PostRequest;
import com.linkedin.clone.model.Post;
import com.linkedin.clone.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getUserPosts(userId));
    }

    @PostMapping
    public ResponseEntity<Post> createPost(
            @Valid @RequestPart("post") PostRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(postService.createPost(request, email, image));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody PostRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(postService.updatePost(id, request, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        postService.deletePost(id, email);
        return ResponseEntity.ok().build();
    }
}
