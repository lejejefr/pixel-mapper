package com.pixelmapper.api.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor 
public class GetMapListResponseDTO {
    private List<MapDataDTO> maps;
}
