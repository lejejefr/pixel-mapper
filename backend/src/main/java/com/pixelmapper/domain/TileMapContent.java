package com.pixelmapper.domain;

import java.util.Map;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor 
public class TileMapContent {
    private UUID mapId;
    private Map<Layer,byte[]> content;
}
