package com.pixelmapper.persistence.repo;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table (name="tile_map_data")
public class TileMapDataEntity {
    @Id 
    private UUID mapId;

    @Column(nullable = false)
    private Date createdAt;

    @Column(nullable = false)
    private Date lastUpdate;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int width;

    @Column(nullable = false)
    private int height;

    protected TileMapDataEntity(){}

    public TileMapDataEntity(
        UUID mapId,
        Date createdAt,
        Date lastUpdate,
        String title,
        String description,
        int width,
        int height
    ){
        this.mapId = mapId;
        this.createdAt = createdAt;
        this.lastUpdate = lastUpdate;
        this.title = title;
        this.description = description;
        this.width = width;
        this.height = height;
    }

    public UUID getMapId() {return this.mapId;}
    public Date getCreatedAt() {return this.createdAt;}
    public Date getLastUpdate() {return this.lastUpdate;}
    public String getTitle() {return this.title;}
    public String getDescription() {return this.description;}
    public int getWidth() {return this.width;}
    public int getHeight() {return this.height;}
}
