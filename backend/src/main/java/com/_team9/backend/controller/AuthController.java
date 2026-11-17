
package com._team9.backend.controller;

import com._team9.backend.entity.User;
import com._team9.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

/**
 * UwU provides information about the authenticated CyberSense user.
 *
 * Only returns safe account details.
 * Password hashes are never included in the response.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public CurrentUser getCurrentUser(Principal principal) {

        if (principal == null) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Not logged in"
            );
        }

        User user = userRepository.findByEmail(principal.getName())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Account not found"
            ));

        return new CurrentUser(
            user.getId(),
            user.getUsername(),
            user.getEmail()
        );
    }

    public record CurrentUser(
        Long id,
        String username,
        String email
    ) {}
}