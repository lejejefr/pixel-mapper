import { CreateMapRequestDTO } from './../../models/dto';
import { CreateMapRequest } from './../../models/create-request';
import { NavListElementProps } from './../../models/nav-list-element-props';
import { inject, Service, signal } from '@angular/core';
import { MapData, MapDataProps } from '../../models/map-data';
import { ReconfigureRequest } from '../../models/reconfigure-request';
import { ApiService } from '../api-service/api-service';
import { GetMapListResponseDTO } from '../../models/dto';

@Service()
export class MapListService {
  readonly api = inject(ApiService);
  readonly mapList = signal<MapDataProps[]>([
    new MapDataProps(
      crypto.randomUUID(),
      new Date(),
      new Date(),
      "title",
      "description",
      32,
      32
    )
  ]);

  async refresh(): Promise<void>{
    const result : MapDataProps[] = [];
    const list : GetMapListResponseDTO = await this.api.getMapList();

    list.maps.forEach(map => {
      result.push(new MapDataProps(
        map.mapId,
        map.createdAt,
        map.lastUpdate,
        map.title,
        map.description,
        map.width,
        map.height
      ));
    });

    this.mapList.set(result);
  }

  async getMapData(props : MapDataProps): Promise<MapData>{
    const response = await this.api.getMap(props.mapId);
    return new MapData(props,response.content);
  }

  async createMapData(request : CreateMapRequest): Promise<string>{
    const response = await this.api.createNewMap(request);

    await this.refresh();

    return response.mapId;
  }

  async reconfigureMapData(mapId : string, request: ReconfigureRequest): Promise<void>{
    await this.api.updateMapData({
      mapId:mapId,
      title:request.title,
      description:request.description
    })
    await this.refresh();
  }

  async delete(mapId : string): Promise<void>{
    await this.api.deleteMap(mapId);
    await this.refresh();
  }

  async duplicate(mapId : string): Promise<void>{
    await this.api.duplicateMap(mapId);
    await this.refresh();
  }
}
