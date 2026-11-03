import { Service } from '@angular/core';
import { CreateMapRequestDTO, GetMapListResponseDTO, MapDTO, SaveMapRequestDTO, UpdateMapDataRequestDTO } from '../../models/dto';

@Service()
export class ApiService {
  public async saveMapContent(request : SaveMapRequestDTO): Promise<void>{
    const response = await fetch('/api/edit/save',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(request),
    });

    if(!response.ok){
      throw new Error("Map content could not be saved");
    }
  }

  public async createNewMap(request : CreateMapRequestDTO): Promise<MapDTO>{
    const response = await fetch('/api/nav/create',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(request),
    });

    if(!response.ok){
      throw new Error("Map could not be created");
    }

    return response.json();
  }

  public async getMapList(): Promise<GetMapListResponseDTO>{
    const response = await fetch('/api/nav/list',{
      method: 'GET',
      headers: {'Content-Type' : 'application/json'},
    });

    if(!response.ok){
      throw new Error("Map list could not be found");
    }

    return response.json();
  }

  public async getMap(mapId : string): Promise<MapDTO>{
    const response = await fetch('/api/nav/get-map',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(mapId),
    });

    if(!response.ok){
      throw new Error("Map could not be found");
    }

    return response.json();
  }

  public async updateMapData(request : UpdateMapDataRequestDTO): Promise<void>{
    const response = await fetch('/api/nav/update',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(request),
    });

    if(!response.ok){
      throw new Error("Map data could not be updated");
    }
  }

  public async deleteMap(mapId : string): Promise<void>{
    const response = await fetch('/api/nav/delete',{
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(mapId),
    });

    if(!response.ok){
      throw new Error("Map could not be deleted");
    }
  }

  public async duplicateMap(mapId : string): Promise<MapDTO>{
    const response = await fetch('/api/nav/duplicate',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(mapId),
    });

    if(!response.ok){
      throw new Error("Map data could not be duplicated");
    }

    return response.json();
  }
}
