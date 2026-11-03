package com.pixelmapper.persistence.adapters;

import java.util.Optional;
import java.util.UUID;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.pixelmapper.domain.Layer;
import com.pixelmapper.domain.TileMapContent;
import com.pixelmapper.domain.TileMapContentRepoTemplate;
import com.pixelmapper.persistence.repo.TileMapLayerEntity;
import com.pixelmapper.persistence.repo.TileMapLayerJpaRepository;

@Repository 
public class TileMapLayerRepoAdapter implements TileMapContentRepoTemplate {
    
    private final TileMapLayerJpaRepository repo;

    TileMapLayerRepoAdapter(TileMapLayerJpaRepository repo){
        this.repo = repo;
    }

    public Optional<TileMapContent> findByID(UUID mapId){
        List<TileMapLayerEntity> layers = this.repo.findByIdMapId(mapId);
        
        Map<Layer,short[]> content = new EnumMap<>(Layer.class);

        for(TileMapLayerEntity layer : layers){
            content.put(layer.getLayer(),layer.getContent());
        }

        return Optional.ofNullable(new TileMapContent(
            mapId,
            content
        ));
    }

    public void save(TileMapContent content){
        for(Layer layer : content.getContent().keySet()){
            this.repo.save(new TileMapLayerEntity(content.getMapId(), layer, content.getContent().get(layer)));
        }
    }

    public void deleteById(UUID mapId){
        this.repo.deleteByIdMapId(mapId);
    }
}
