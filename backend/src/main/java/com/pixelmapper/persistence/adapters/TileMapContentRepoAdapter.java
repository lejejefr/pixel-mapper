package com.pixelmapper.persistence.adapters;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.pixelmapper.domain.TileMapContent;
import com.pixelmapper.domain.TileMapContentRepoTemplate;
import com.pixelmapper.persistence.repo.TileMapContentEntity;
import com.pixelmapper.persistence.repo.TileMapContentJpaRepository;

@Repository 
public class TileMapContentRepoAdapter implements TileMapContentRepoTemplate {
    
    private final TileMapContentJpaRepository repo;

    TileMapContentRepoAdapter(TileMapContentJpaRepository repo){
        this.repo = repo;
    }

    public Optional<TileMapContent> findByID(UUID mapId){
        Optional<TileMapContentEntity> optEntity = this.repo.findById(mapId);
        if(optEntity.isEmpty()){
            return Optional.empty();
        }
        TileMapContentEntity entity = optEntity.get();
        return Optional.ofNullable(new TileMapContent(
            entity.getMapId(),
            entity.getContent()
        ));
    }

    public void save(TileMapContent content){
        var entity = new TileMapContentEntity(
            content.getMapId(),
            content.getContent()
        );
        this.repo.save(entity);
    }

    public void deleteById(UUID mapId){
        this.repo.deleteById(mapId);
    }
}
