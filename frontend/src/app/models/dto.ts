import { Layer } from "./map-data";

export type SaveMapRequestDTO = {
  mapId : string,
  content : Record<Layer, Uint8Array>,
}

export type CreateMapRequestDTO = {
  title : string,
  description : string,
  width : number,
  height : number,
}

export type MapDTO = {
  mapId : string,
  createdAt : Date,
  lastUpdate : Date,
  title : string,
  description : string,
  width : number,
  height : number,
  content : Record<Layer, Uint8Array>,
}

export type GetMapListResponseDTO = {
  maps : MapDataDTO[]
}

export type MapDataDTO = {
  mapId : string,
  createdAt : Date,
  lastUpdate : Date,
  title : string,
  description : string,
  width : number,
  height : number,
}

export type UpdateMapDataRequestDTO = {
  mapId : string,
  title : string,
  description : string,
}
