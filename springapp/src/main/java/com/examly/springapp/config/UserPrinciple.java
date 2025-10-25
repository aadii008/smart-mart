package com.examly.springapp.config;

import java.util.ArrayList;

import java.util.Collection;

import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springapp.model.User;

public class UserPrinciple implements UserDetails {

    private Long userId;

    private String username;

    private String password;

    private ArrayList<GrantedAuthority> roles;

    public UserPrinciple(User user) {

        this.username = user.getUsername();

        this.password = user.getPassword();

        this.roles = new ArrayList<>();

        this.roles.add(new SimpleGrantedAuthority("ROLE_" + user.getUserRole().toUpperCase()));

    }

    // private final String role; // e.g., "ROLE_USER"

    @Override

    public Collection<? extends GrantedAuthority> getAuthorities() {

        return roles;

    }

    @Override

    public String getPassword() {

        return this.password;

    }

    @Override

    public String getUsername() {

        return username;

    }

    @Override

    public boolean isAccountNonExpired() {

        return true;

    }

    @Override

    public boolean isAccountNonLocked() {

        return true;

    }

    @Override

    public boolean isCredentialsNonExpired() {

        return true;

    }

    @Override

    public boolean isEnabled() {

        return true;

    }

    @Override

    public boolean equals(Object o) {

        if (this == o)
            return true;

        if (!(o instanceof UserPrinciple that))
            return false;

        return Objects.equals(userId, that.userId) && Objects.equals(username, that.username);

    }

    @Override

    public int hashCode() {

        return Objects.hash(userId, username);

    }

}
