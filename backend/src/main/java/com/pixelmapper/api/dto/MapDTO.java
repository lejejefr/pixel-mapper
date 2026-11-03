package com.pixelmapper.api.dto;

import java.util.Map;
import java.util.UUID;
import java.util.Date;

import com.pixelmapper.domain.Layer;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor 
public class MapDTO {
    private UUID mapId;
    private Date createdAt;
    private Date lastUpDate;
    private String title;
    private String description;
    private int width;
    private int height;
    private Map<Layer,short[]> content;
}
