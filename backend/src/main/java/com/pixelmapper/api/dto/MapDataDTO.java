package com.pixelmapper.api.dto;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor 
public class MapDataDTO {
    private UUID mapId;
    private Date createdAt;
    private Date lastUpdate;
    private String title;
    private String description;
    private int width;
    private int height;
}
