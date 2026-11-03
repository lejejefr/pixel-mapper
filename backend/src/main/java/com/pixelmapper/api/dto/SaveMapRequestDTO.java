package com.pixelmapper.api.dto;

import java.util.Map;
import java.util.UUID;

import com.pixelmapper.domain.Layer;

import lombok.Data;

@Data 
public class SaveMapRequestDTO {
    private UUID mapId;
    private Map<Layer,byte[]> content;
}
