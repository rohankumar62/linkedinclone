package com.linkedin.clone.service;

import com.linkedin.clone.dto.CommentRequest;
import com.linkedin.clone.model.Comment;
import com.linkedin.clone.model.Post;
import com.linkedin.clone.model.User;
import com.linkedin.clone.repository.CommentRepository;
import com.linkedin.clone.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public List<Comment> getPostComments(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    public Comment createComment(Long postId, CommentRequest request, String email) {
        User user = userService.getUserByEmail(email);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setUser(user);
        comment.setPost(post);

        return commentRepository.save(comment);
    }
}
