package com.pixelmapper.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor 
public class UpdateMapDataRequest {
    private String title;
    private String description;
}
