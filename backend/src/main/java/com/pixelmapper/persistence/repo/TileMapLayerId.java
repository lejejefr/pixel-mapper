package com.pixelmapper.persistence.repo;

import java.io.Serializable;
import java.util.UUID;

import com.pixelmapper.domain.Layer;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable 
public record TileMapLayerId(
    @Column (nullable= false)
    UUID mapId,
    @Enumerated(EnumType.STRING)
    Layer layer
) implements Serializable {
    
}
