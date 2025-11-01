package com.linkedin.clone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String bio;
    private String profileImage;
    private LocalDateTime createdAt;
}
