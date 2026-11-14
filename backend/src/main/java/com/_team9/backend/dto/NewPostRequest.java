package com._team9.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewPostRequest(
        @NotBlank @Size(max = 1000) String body,
        Long parentPostId
) {}
