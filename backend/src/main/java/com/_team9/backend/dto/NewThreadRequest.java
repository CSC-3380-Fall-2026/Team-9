package com._team9.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewThreadRequest(
        @NotBlank @Size(max = 200) String title,
        @NotBlank @Size(max = 5000) String body
) {}
