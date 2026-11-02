package com.pixelmapper.api.dto;

import lombok.Data;

@Data 
public class CreateMapRequestDTO {
    private String title;
    private String description;
    private int width;
    private int height;
}
