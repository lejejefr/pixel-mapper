package com.pixelmapper.api.controllers;

import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pixelmapper.api.dto.CreateMapRequestDTO;
import com.pixelmapper.api.dto.GetMapListResponseDTO;
import com.pixelmapper.api.dto.MapDTO;
import com.pixelmapper.api.dto.UpdateMapDataRequestDTO;
import com.pixelmapper.api.usecases.UseCases;
import com.pixelmapper.domain.MapIDNotFoundException;

@RestController 
@RequestMapping ("api/nav")
public class NavController {
    private final UseCases useCases;

    NavController(
        UseCases useCases
    ){
        this.useCases = useCases;
    }

    @PostMapping ("/create")
    public MapDTO createNewMap(@RequestBody CreateMapRequestDTO request){
        return useCases.createNewMap(request);
    }

    @GetMapping ("/list")
    public GetMapListResponseDTO getMapList(){
        return useCases.getMapList();
    }

    @PostMapping ("/get-map")
    public MapDTO getMap(@RequestBody UUID mapId) throws MapIDNotFoundException{
        return useCases.getMap(mapId);
    }

    @PostMapping ("/update")
    public void updateMapData(@RequestBody UpdateMapDataRequestDTO request) throws MapIDNotFoundException{
        useCases.updateMapData(request);
    }

    @DeleteMapping ("/delete")
    public void deleteMap(@RequestBody UUID mapId) throws MapIDNotFoundException{
        useCases.deleteMap(mapId);
    }

    @PostMapping ("/duplicate")
    public MapDTO duplicateMap(@RequestBody UUID mapId) throws MapIDNotFoundException{
        return useCases.duplicateMap(mapId);
    }
}
