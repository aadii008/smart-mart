package com.examly.springapp.DTO;


import java.util.List;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;

public record UserDTO(
    long userId,
    String email,
    String password,
    String username,
    String mobileNumber,
    String userRole
) {

    public static User toEntity(UserDTO userDTO) {
        User.UserBuilder builder = User.builder()
                                        .userId(userDTO.userId())
                                        .email(userDTO.email())
                                        .password(userDTO.password())
                                        .username(userDTO.username())
                                        .mobileNumber(userDTO.mobileNumber())
                                        .userRole(userDTO.userRole());

                                        
        return builder.build();
    }

    public static UserDTO fromEntity(User user) {
        return new UserDTO(
            user.getUserId(),
            user.getEmail(),
            user.getPassword(),
            user.getUsername(),
            user.getMobileNumber(),
            user.getUserRole()
        );
    }
}
