package com.examly.springapp.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :name")
    public Optional<User> findByUsername(String name);

    @Query("SELECT u FROM User u WHERE u.mobileNumber = :mobileNumber")
    public Optional<User> findByMobileNumber(String mobileNumber);

    @Query("SELECT u FROM User u WHERE u.mobileNumber = :mobileNumber AND u.username = :username")
    public Optional<User> findByPhoneOrUsername(String mobileNumber,String username);

    @Query("SELECT u FROM User u WHERE u.userRole LIKE 'PENDING_ADMIN'")
    public List<User> getAdmins();
}
