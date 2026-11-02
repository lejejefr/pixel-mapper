package com.pixelmapper.api.dto;

import java.util.UUID;

import lombok.Data;

@Data 
public class UpdateMapDataRequestDTO {
    private UUID mapId;
    private String title;
    private String description;
}
