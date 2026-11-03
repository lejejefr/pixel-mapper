package com.pixelmapper.api.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pixelmapper.api.dto.SaveMapRequestDTO;
import com.pixelmapper.api.usecases.UseCases;
import com.pixelmapper.domain.MapIDNotFoundException;

@RestController 
@RequestMapping ("api/edit")
public class EditController {
    private final UseCases useCases;

    EditController(
        UseCases useCases
    ){
        this.useCases = useCases;
    }

    @PostMapping ("/save")
    public void saveMapContent(@RequestBody SaveMapRequestDTO request) throws MapIDNotFoundException{
        useCases.saveMapContent(request);
    }
}
