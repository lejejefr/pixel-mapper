package com.pixelmapper.domain;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data 
public class TileMapData {
    private UUID mapId;
    private Date createdAt;
    private Date lastUpdate;
    private String title;
    private String description;
    private int width;
    private int height;
}
