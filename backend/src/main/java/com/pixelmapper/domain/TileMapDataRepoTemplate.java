package com.pixelmapper.domain;

import java.util.List;
import java.util.UUID;

public interface TileMapDataRepoTemplate {
    public List<TileMapData> findAll();
    public TileMapData findByID(UUID mapId);
    public void save(TileMapData data);
    public void deleteById(UUID mapId);
}
