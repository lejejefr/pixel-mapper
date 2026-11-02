package com.pixelmapper.api.usecases;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.EnumMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pixelmapper.api.dto.CreateMapRequestDTO;
import com.pixelmapper.api.dto.CreateMapResponseDTO;
import com.pixelmapper.domain.Layer;
import com.pixelmapper.domain.TileMapContent;
import com.pixelmapper.domain.TileMapData;
import com.pixelmapper.domain.TileMapService;
import com.pixelmapper.persistence.adapters.TileMapContentRepoAdapter;
import com.pixelmapper.persistence.adapters.TileMapDataRepoAdapter;

@Service 
public class NavUseCases {
    private final TileMapService domain;

    NavUseCases(
        TileMapContentRepoAdapter contentRepo,
        TileMapDataRepoAdapter dataRepo
    ){
        this.domain = new TileMapService(dataRepo, contentRepo);
    }

    public CreateMapResponseDTO CreateNewMap(CreateMapRequestDTO request){
        UUID mapId = UUID.randomUUID();
        Date now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        Map<Layer,byte[]> contentMap = new EnumMap<>(Layer.class);

        for(Layer layer : Layer.values()){
            contentMap.put(layer,new byte[request.getWidth() * request.getHeight()]);
        }

        TileMapContent content = new TileMapContent(mapId, contentMap);
        TileMapData data = new TileMapData(
            mapId,
            now,
            now,
            request.getTitle(),
            request.getDescription(),
            request.getWidth(),
            request.getHeight()
        );

        domain.saveMap(data,content);

        return new CreateMapResponseDTO(
            mapId,
            now,
            now,
            request.getTitle(),
            request.getDescription(),
            request.getWidth(),
            request.getHeight(),
            contentMap
        );
    }
}
