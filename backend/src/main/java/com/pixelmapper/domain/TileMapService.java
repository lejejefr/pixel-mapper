package com.pixelmapper.domain;

import java.util.UUID;

public class TileMapService {

    //TODO créer interface TileMapRepo

    public TileMapData[] listAllMapsData(){
        TileMapData[] list = {};
        return list;
    }

    public TileMapContent loadMap(UUID mapId){
        return null;
    }

    public void saveMap(TileMapContent map){

    }

    public void updateMapData(UUID mapID, UpdateMapDataRequest request){

    }

    public UUID duplicateMap(UUID mapID){
        return mapID;
    }

    public void eraseMap(UUID mapID){

    }
}
