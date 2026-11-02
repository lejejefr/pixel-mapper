package com.pixelmapper.persistence.repo;

import java.util.UUID;

import com.pixelmapper.domain.Layer;

import java.util.Map;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity 
public class TileMapContentEntity {
    @Id 
    private UUID mapId;

    @Column (nullable = false)
    private Map<Layer,byte[]> content;

    protected TileMapContentEntity() {}

    TileMapContentEntity(
        UUID mapId,
        Map<Layer,byte[]> content
    ) {
        this.mapId = mapId;
        this.content = content;
    }

    public Map<Layer, byte[]> getContent() { return content; }
    public UUID getMapId() { return mapId; }
}
