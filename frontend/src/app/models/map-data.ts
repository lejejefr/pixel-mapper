export type Layer = "terrain" | "vegetation" | "roads" | "cities"

export class MapDataProps{
  constructor(
    public mapId: string,
    public createdAt: Date,
    public lastUpdate: Date,
    public title: string,
    public description: string,
    public width: number,
    public height: number,
  ){

  }
}

export class MapData {
  private layers!: Record<Layer, Uint8Array>;

  constructor(
    public props : MapDataProps
  ) {
    this.layers = {
      terrain: new Uint8Array(this.props.height * this.props.width),
      vegetation: new Uint8Array(this.props.height * this.props.width),
      roads: new Uint8Array(this.props.height * this.props.width),
      cities: new Uint8Array(this.props.height * this.props.width),
    }
  }

  setCell(x : number, y : number, layer : Layer, value : number): void{
    if(x >= this.props.width || x < 0 || y >= this.props.height || y < 0){
      throw new Error("Out on bounds");
    }
    this.layers[layer][x * this.props.height + y] = value;
  }

  getCell(x : number, y : number, layer : Layer): number{
    if(x >= this.props.width || x < 0 || y >= this.props.height || y < 0){
      throw new Error("Out on bounds");
    }
    return this.layers[layer][x * this.props.height + y];
  }
}
