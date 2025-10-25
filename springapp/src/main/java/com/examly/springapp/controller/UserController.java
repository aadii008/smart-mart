package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.DTO.UserDTO;

import com.examly.springapp.model.LoginDTO;

import com.examly.springapp.service.UserService;

import jakarta.persistence.EntityNotFoundException;

import com.examly.springapp.DTO.LoginRequestDTO;


@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO register(@RequestBody UserDTO user) {
        return userService.createUser(user);
    }

    @PostMapping("/api/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginDTO loginEntity(@RequestBody LoginRequestDTO loginRequestDto) {
        return userService.loginUser(loginRequestDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping("/api/user")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> getAllUsers() {
        return userService.findAllUsers();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/api/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO getUserByUserId(@PathVariable long userId) {
        return userService.getById(userId);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/api/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO deleteUser(@PathVariable long userId) {
        UserDTO user = userService.getById(userId);
        userService.deleteUser(userId);
        return user;
    }

    @GetMapping("/api/user/username/{username}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO getUserByName(@PathVariable String username){
      Optional<UserDTO> user=userService.getUserByName(username);
      if(user.isEmpty()){
        throw new EntityNotFoundException("Username Already exists");
      }
      return user.get();         
    }

    @GetMapping("/api/user/mobileNumber/{mobileNumber}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO findByMobileNumber(@PathVariable String mobileNumber){
        Optional<UserDTO> user=userService.getPhoneByMobileNumber(mobileNumber);
        if(user.isEmpty()){
            throw new EntityNotFoundException("Mobile Number Already exists");
        }
        return user.get();
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @GetMapping("/api/superadmin")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> getAdmins(){
        return userService.getAdmins();
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PutMapping("/api/superadmin/approve/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean approveAdmin(@PathVariable Long userId){
        return userService.approveAdmin(userId);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PutMapping("/api/superadmin/reject/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean rejectAdmin(@PathVariable Long userId){
        return userService.rejectAdmin(userId);
    }


 

}
