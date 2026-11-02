package com.pixelmapper.domain;

import java.util.UUID;
import java.util.Optional;

public interface TileMapContentRepoTemplate {
    public Optional<TileMapContent> findByID(UUID mapID);
    public void save(TileMapContent content);
    public void deleteById(UUID mapID);
}
