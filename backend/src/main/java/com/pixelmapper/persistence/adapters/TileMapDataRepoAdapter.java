package com.pixelmapper.persistence.adapters;

import java.util.UUID;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.pixelmapper.domain.TileMapData;
import com.pixelmapper.domain.TileMapDataRepoTemplate;
import com.pixelmapper.persistence.repo.TileMapDataEntity;
import com.pixelmapper.persistence.repo.TileMapDataJpaRepository;

@Repository 
public class TileMapDataRepoAdapter implements TileMapDataRepoTemplate {

    private final TileMapDataJpaRepository repo;

    TileMapDataRepoAdapter(TileMapDataJpaRepository repo){
        this.repo = repo;
    }

    public List<TileMapData> findAll(){
        List<TileMapData> result = new ArrayList<TileMapData>();
        for (TileMapDataEntity entity : this.repo.findAll()) {
            result.add(
                new TileMapData(
                    entity.getMapId(),
                    entity.getCreatedAt(),
                    entity.getLastUpdate(),
                    entity.getTitle(),
                    entity.getDescription(),
                    entity.getWidth(),
                    entity.getHeight()
                )
            );
        }
        return result;
    }

    public Optional<TileMapData> findByID(UUID mapId){
        Optional<TileMapDataEntity> optEntity = this.repo.findById(mapId);
        if(optEntity.isEmpty()){
            return Optional.empty();
        }
        TileMapDataEntity entity = optEntity.get();
        return Optional.ofNullable(
            new TileMapData(
                entity.getMapId(),
                entity.getCreatedAt(),
                entity.getLastUpdate(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getWidth(),
                entity.getHeight()
            )
        );
    }

    public void save(TileMapData data){
        this.repo.save(new TileMapDataEntity(
            data.getMapId(),
            data.getCreatedAt(),
            data.getLastUpdate(),
            data.getTitle(),
            data.getDescription(),
            data.getWidth(),
            data.getHeight()
        ));
    }

    public void deleteById(UUID mapId){
        this.repo.deleteById(mapId);
    }
}
