package com.pixelmapper.domain;

import java.util.Map;

import lombok.Data;

@Data 
public class TileMap {
    private Map<Layer,byte[]> content;
    private TileMapData data;
}
