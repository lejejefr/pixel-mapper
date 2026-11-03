import { Service } from '@angular/core';
import { CreateMapRequestDTO, GetMapListResponseDTO, MapDTO, SaveMapRequestDTO, UpdateMapDataRequestDTO } from '../../models/dto';

@Service()
export class ApiService {
// "/api/edit"
    /*@PostMapping ("/save")
    public void saveMapContent(@RequestBody SaveMapRequestDTO request) throws MapIDNotFoundException{
        useCases.saveMapContent(request);
    }*/
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

// "/api/nav"
   /*
    @PostMapping ("/create")
    public MapDTO createNewMap(@RequestBody CreateMapRequestDTO request){
        return useCases.createNewMap(request);
    }*/

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

   /*
    @GetMapping ("/list")
    public GetMapListResponseDTO getMapList(){
        return useCases.getMapList();
    }*/

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
   /*
    @PostMapping ("/get-map")
    public MapDTO getMap(@RequestBody UUID mapId) throws MapIDNotFoundException{
        return useCases.getMap(mapId);
    }*/

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
   /*
    @PostMapping ("/update")
    public void updateMapData(@RequestBody UpdateMapDataRequestDTO request) throws MapIDNotFoundException{
        useCases.updateMapData(request);
    }*/

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

   /*
    @DeleteMapping ("/delete")
    public void deleteMap(@RequestBody UUID mapId) throws MapIDNotFoundException{
        useCases.deleteMap(mapId);
    }*/

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
   /*
    @PostMapping ("/duplicate")
    public MapDTO duplicateMap(@RequestBody UUID mapId) throws MapIDNotFoundException{
        return useCases.duplicateMap(mapId);
    }**/

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
