package com.pixelmapper.persistence.repo;

import java.util.UUID;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TileMapLayerJpaRepository extends JpaRepository<TileMapLayerEntity,TileMapLayerId>{
    List<TileMapLayerEntity> findByIdMapId(UUID mapId);
    void deleteByIdMapId(UUID mapId);
}
