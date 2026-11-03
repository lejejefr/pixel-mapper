package com.pixelmapper.domain;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class TileMapService {

    private final TileMapDataRepoTemplate dataRepo;
    private final TileMapContentRepoTemplate contentRepo;

    public TileMapService(
        TileMapDataRepoTemplate dataRepo,
        TileMapContentRepoTemplate contentRepo
    ){
        this.dataRepo = dataRepo;
        this.contentRepo = contentRepo;
    }

    public List<TileMapData> listAllMapsData(){
        return dataRepo.findAll();
    }

    public TileMapData loadMapData(UUID mapId) throws MapIDNotFoundException{
        Optional<TileMapData> data = dataRepo.findByID(mapId);
        if(data.isEmpty()){
            throw new MapIDNotFoundException("Map id [" + mapId + "] not found in data ");
        }
        return data.get();
    }

    public TileMapContent loadMapContent(UUID mapId) throws MapIDNotFoundException{
        Optional<TileMapContent> content = contentRepo.findByID(mapId);
        if(content.isEmpty()){
            throw new MapIDNotFoundException("Map id [" + mapId + "] not found in content ");
        }
        return content.get();
    }

    public void saveMap(TileMapData data, TileMapContent content){
        dataRepo.save(data);
        contentRepo.save(content);
    }

    public void updateMapData(UUID mapId, UpdateMapDataRequest request) throws MapIDNotFoundException{
        Optional<TileMapData> optData = dataRepo.findByID(mapId);
        if(optData.isEmpty()){
            throw new MapIDNotFoundException("Map id [" + mapId + "] not found in data ");
        }
        TileMapData data = optData.get();

        Boolean flag = false;
        if(request.getDescription() != ""){
            data.setDescription(request.getDescription());
            flag = true;
        }
        if(request.getTitle() != ""){
            data.setTitle(request.getTitle());
            flag = true;
        }
        if (flag){
            dataRepo.save(data);
        }
    }

    public void saveMapContent(TileMapContent content) throws MapIDNotFoundException{
        Optional<TileMapContent> existingContent = contentRepo.findByID(content.getMapId());
        if(existingContent.isEmpty()){
            throw new MapIDNotFoundException("Map id [" + content.getMapId() + "] not found in content ");
        }
        contentRepo.save(content);
    }

    public UUID duplicateMap(UUID mapId) throws MapIDNotFoundException{
        Optional<TileMapData> optData = dataRepo.findByID(mapId);
        if(optData.isEmpty()){
            throw new MapIDNotFoundException("Map id [" + mapId + "] not found in data ");
        }
        Optional<TileMapContent> optContent = contentRepo.findByID(mapId);
        if(optContent.isEmpty()){
            throw new MapIDNotFoundException("Map id [" + mapId + "] not found in content ");
        }


        TileMapData copyData = optData.get();
        TileMapContent copyContent = optContent.get();

        UUID copyId = UUID.randomUUID();
        Date now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        String copyTitle = "Copie de " + copyData.getTitle();

        copyData.setTitle(copyTitle);
        copyData.setMapId(copyId);
        copyData.setCreatedAt(now);
        copyData.setLastUpdate(now);

        copyContent.setMapId(copyId);

        dataRepo.save(copyData);
        contentRepo.save(copyContent);

        return copyId;
    }

    public void eraseMap(UUID mapId){
        contentRepo.deleteById(mapId);
        dataRepo.deleteById(mapId);
    }
}
