package com.pixelmapper.domain;

import java.util.Date;

import lombok.Data;

@Data 
public class TileMapData {
    private String mapId;
    private Date createdAt;
    private Date lastUpdate;
    private String title;
    private String description;
    private int width;
    private int height;
}
