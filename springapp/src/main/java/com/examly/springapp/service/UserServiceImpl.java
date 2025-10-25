package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.DTO.LoginRequestDTO;
import com.examly.springapp.DTO.UserDTO;
import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exception.AdminRequestPendingException;
import com.examly.springapp.exception.DuplicateUserException;
import com.examly.springapp.exception.NoUserFoundException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;
    private JwtUtils jwtUtils;

    @Autowired
    public UserServiceImpl(PasswordEncoder passwordEncoder, JwtUtils jwtUtils, UserRepo userRepo) {
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.userRepo = userRepo;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = UserDTO.toEntity(userDTO);
        if (user == null) {
            throw new IllegalArgumentException("Enter valid details!");
        }

        Optional<User> duplicateUserByName = userRepo.findByUsername(user.getUsername());
        if (duplicateUserByName.isPresent()) {
            throw new DuplicateUserException("User with username " + user.getUsername() + " already exists!");
        }

        Optional<User> duplicateUserByMobileNumber = userRepo.findByMobileNumber(user.getMobileNumber());
        if (duplicateUserByMobileNumber.isPresent()) {
            throw new DuplicateUserException("User with mobile number " + user.getMobileNumber() + "already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return UserDTO.fromEntity(userRepo.save(user));
    }

    @Override
    public List<UserDTO> findAllUsers() {
        List<User> users = userRepo.findAll();
        if (users.isEmpty()) {
            throw new NoUserFoundException("No user found!");
        }

        List<UserDTO> usersDTO = new ArrayList<>();
        for (User user : users) {
            usersDTO.add(UserDTO.fromEntity(user));
        }

        return usersDTO;
    }

    @Override
    public LoginDTO loginUser(LoginRequestDTO userDTO) {
        User existingUser = userRepo.findByUsername(userDTO.getUsername()).orElse(null);

        if (existingUser == null) {

            throw new DuplicateUserException("User with User");
        }

        if (passwordEncoder.matches(userDTO.getPassword(), existingUser.getPassword()))
        {

            if (existingUser.getUserRole().equals("PENDING_ADMIN")) {
                throw new AdminRequestPendingException("Unauthorized: Admin request yet to be approved by Superadmin.");
            } else if (existingUser.getUserRole().equals("REJECTED_ADMIN")) {
                throw new AdminRequestPendingException(
                        "Unauthorized: Admin request has been rejected by the Superadmin.");
            }
            else{
                return new LoginDTO(jwtUtils.generateToken(userDTO.getUsername()),
                existingUser.getUsername(), existingUser.getUserRole(), existingUser.getUserId());
            }
        }
        else
        {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }

    @Override
    public UserDTO getById(long id) {
        if (!userRepo.existsById(id)) {
            throw new EntityNotFoundException("There is no user with ID " + id + "!");
        }
        Optional<User> foundUser = userRepo.findById(id);
        if (!foundUser.isPresent()) {
            throw new EntityNotFoundException("There is no user with ID " + id + "!");
        }
        return UserDTO.fromEntity(foundUser.get());
    }

    @Override
    public void deleteUser(long id) {
        if (!userRepo.existsById(id)) {
            throw new EntityNotFoundException("There is no user with ID " + id + "!");
        }
        userRepo.deleteById(id);
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        User user = UserDTO.toEntity(userDTO);
        if (!userRepo.existsById(user.getUserId())) {
            throw new EntityNotFoundException("User to update not found!");
        }
        userRepo.save(user);
    }

    @Override
    public Optional<UserDTO> getUserByName(String name) {
        Optional<User> user = userRepo.findByUsername(name);
        if (!user.isPresent()) {
            throw new EntityNotFoundException("There is no user with name " + name + "!");
        }
        return Optional.of(UserDTO.fromEntity(user.get()));
    }

    @Override
    public Optional<UserDTO> getPhoneByMobileNumber(String mobileNumber) {
        Optional<User> user = userRepo.findByMobileNumber(mobileNumber);
        if (!user.isPresent()) {
            throw new EntityNotFoundException("There is no user with mobileNumber " + mobileNumber + "!");
        }
        return Optional.of(UserDTO.fromEntity(user.get()));
        
    }


    @Override
    public List<UserDTO> getAdmins() {
        List<User> pendingAdminList = userRepo.getAdmins();
        List<UserDTO> adminDtoList = new ArrayList<>();
        for (User user : pendingAdminList) {
            adminDtoList.add(UserDTO.fromEntity(user));
        }
        return adminDtoList;
    }
 
    @Override
    public boolean approveAdmin(Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            throw new EntityNotFoundException("User with ID: " + userId + " not found");
        } else {
            user.setUserRole("ADMIN");
            userRepo.save(user);
            return true;
        }
    }
 
    @Override
    public boolean rejectAdmin(Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            throw new EntityNotFoundException("User with ID: " + userId + " not found");
        } else {
            user.setUserRole("REJECTED_ADMIN");
            userRepo.save(user);
            return true;
        }
    }

    



}
