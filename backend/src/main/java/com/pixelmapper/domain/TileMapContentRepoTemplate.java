package com.pixelmapper.domain;

import java.util.UUID;

public interface TileMapContentRepoTemplate {
    public TileMapContent findByID(UUID mapID);
    public void save(TileMapContent content);
    public void deleteById(UUID mapID);
}
