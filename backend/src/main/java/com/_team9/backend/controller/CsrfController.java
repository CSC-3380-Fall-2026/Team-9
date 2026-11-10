package com._team9.backend.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * uhh provides a CSRF token to the CyberSense frontend.
 *
 * React will include this token when making requests
 * that change data, such as registration and login.
 */
@RestController
public class CsrfController {

    @GetMapping("/api/csrf")
    public CsrfToken getCsrfToken(CsrfToken csrfToken) {
        return csrfToken;
    }
}