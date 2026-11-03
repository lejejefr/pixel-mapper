package com.pixelmapper.api.usecases;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pixelmapper.api.dto.CreateMapRequestDTO;
import com.pixelmapper.api.dto.GetMapListResponseDTO;
import com.pixelmapper.api.dto.MapDTO;
import com.pixelmapper.api.dto.MapDataDTO;
import com.pixelmapper.api.dto.SaveMapRequestDTO;
import com.pixelmapper.api.dto.UpdateMapDataRequestDTO;
import com.pixelmapper.domain.Layer;
import com.pixelmapper.domain.MapIDNotFoundException;
import com.pixelmapper.domain.TileMapContent;
import com.pixelmapper.domain.TileMapData;
import com.pixelmapper.domain.TileMapService;
import com.pixelmapper.domain.UpdateMapDataRequest;
import com.pixelmapper.persistence.adapters.TileMapDataRepoAdapter;
import com.pixelmapper.persistence.adapters.TileMapLayerRepoAdapter;

@Service 
public class UseCases {
    private final TileMapService domain;

    UseCases(
        TileMapLayerRepoAdapter contentRepo,
        TileMapDataRepoAdapter dataRepo
    ){
        this.domain = new TileMapService(dataRepo, contentRepo);
    }

    public MapDTO createNewMap(CreateMapRequestDTO request){
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

        return new MapDTO(
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

    public GetMapListResponseDTO getMapList(){
        List<MapDataDTO> result = new ArrayList<MapDataDTO>();

        for(TileMapData data : domain.listAllMapsData()){
            result.add(new MapDataDTO(
                data.getMapId(),
                data.getCreatedAt(),
                data.getLastUpdate(),
                data.getTitle(),
                data.getDescription(),
                data.getWidth(),
                data.getHeight()
            ));
        }

        return new GetMapListResponseDTO(result);
    }

    public MapDTO getMap(UUID mapId) throws MapIDNotFoundException{
        TileMapData data = domain.loadMapData(mapId);
        TileMapContent content = domain.loadMapContent(mapId);

        return new MapDTO(
            mapId,
            data.getCreatedAt(),
            data.getlastUpdate(),
            data.getTitle(),
            data.getDescription(),
            data.getWidth(),
            data.getHeight(),
            content.getContent()
        );
    }

    public void updateMapData(UpdateMapDataRequestDTO request) throws MapIDNotFoundException{
        domain.updateMapData(
            request.getMapId(),
            new UpdateMapDataRequest(request.getTitle(),request.getDescription())
        );
    }

    public void deleteMap(UUID mapId) throws MapIDNotFoundException{
        domain.eraseMap(mapId);
    }

    public MapDTO duplicateMap(UUID mapId) throws MapIDNotFoundException{
        UUID copyId = domain.duplicateMap(mapId);
        return getMap(copyId);
    }

    public void saveMapContent(SaveMapRequestDTO request) throws MapIDNotFoundException{
        domain.saveMapContent(new TileMapContent(request.getMapId(), request.getContent()));
    }
}
