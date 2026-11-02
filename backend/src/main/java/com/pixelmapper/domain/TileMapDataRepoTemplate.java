package com.pixelmapper.domain;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TileMapDataRepoTemplate {
    public List<TileMapData> findAll();
    public Optional<TileMapData> findByID(UUID mapId);
    public void save(TileMapData data);
    public void deleteById(UUID mapId);
}
