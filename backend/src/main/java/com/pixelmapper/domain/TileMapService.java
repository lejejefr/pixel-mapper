package com.pixelmapper.domain;

import java.util.UUID;

public class TileMapService {

    //TODO créer interface TileMapRepo

    public TileMapData[] listAllMapsData(){
        TileMapData[] list = {};
        return list;
    }

    public TileMap loadMapByID(UUID mapId){
        return null;
    }

    public void saveMap(TileMap map){

    }

    public void updateMapData(UUID mapID, TileMapData data){

    }

    public UUID duplicateMap(UUID mapID){
        return mapID;
    }

    public void eraseMap(UUID mapID){

    }
}
