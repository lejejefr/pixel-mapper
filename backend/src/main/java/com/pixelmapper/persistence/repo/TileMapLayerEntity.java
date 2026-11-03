package com.pixelmapper.persistence.repo;

import java.util.UUID;

import com.pixelmapper.domain.Layer;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity 
@Table (name="tile_map_content")
public class TileMapLayerEntity {
    @EmbeddedId 
    private TileMapLayerId id;

    @Column (nullable = false)
    private byte[] content;

    protected TileMapLayerEntity(){}

    public TileMapLayerEntity(
        UUID mapId,
        Layer layer,
        byte[] content
    ){
        this.id = new TileMapLayerId(mapId, layer);
        this.content = content;
    }
    
    public byte[] getContent(){return this.content;}
    public UUID getMapId(){return this.id.mapId();}
    public Layer getLayer(){return this.id.layer();}
}
