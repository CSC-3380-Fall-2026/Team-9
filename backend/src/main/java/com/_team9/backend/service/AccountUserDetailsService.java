
package com._team9.backend.service;

import com._team9.backend.entity.User;
import com._team9.backend.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Loads registered CyberSense accounts for Spring Security.
 *
 * Password verification will use the BCrypt encoder
 * already configured in PasswordConfig.java.
 */
@Service
public class AccountUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public AccountUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User account = userRepository.findByEmail(email)
            .orElseThrow(() ->
                new UsernameNotFoundException("Invalid credentials")
            );

        return org.springframework.security.core.userdetails.User
            .withUsername(account.getEmail())
            .password(account.getPasswordHash())
            .roles("USER")
            .build();
    }
}