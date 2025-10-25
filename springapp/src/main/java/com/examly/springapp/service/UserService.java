package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.DTO.LoginRequestDTO;

import com.examly.springapp.DTO.UserDTO;
import com.examly.springapp.model.LoginDTO;

public interface UserService {
    public UserDTO createUser(UserDTO user);
    public List<UserDTO> findAllUsers();
    public LoginDTO loginUser(LoginRequestDTO user);
    public UserDTO getById(long id);
    public void deleteUser(long id);
    public void updateUser(UserDTO user);
    public Optional<UserDTO> getUserByName(String name);
    public Optional<UserDTO> getPhoneByMobileNumber(String mobileNumber);
    public List<UserDTO> getAdmins();
    public boolean approveAdmin(Long userId);
    public boolean rejectAdmin(Long userId);
}
