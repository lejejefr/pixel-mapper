export type Layer = "terrain" | "vegetation" | "roads" | "cities"

export class MapData {
  private layers!: Record<Layer, Uint8Array>;

  constructor(
    public mapId: string,
    public createdAt: Date,
    public lastUpdate: Date,
    public title: string,
    public description: string,
    public height: number,
    public width: number,
  ) {
    this.layers = {
      terrain: new Uint8Array(height * width),
      vegetation: new Uint8Array(height * width),
      roads: new Uint8Array(height * width),
      cities: new Uint8Array(height * width),
    }
  }

  setCell(x : number, y : number, layer : Layer, value : number): void{
    if(x >= this.width || x < 0 || y >= this.height || y < 0){
      throw new Error("Out on bounds");
    }
    this.layers[layer][x * this.height + y] = value;
  }

  getCell(x : number, y : number, layer : Layer): number{
    if(x >= this.width || x < 0 || y >= this.height || y < 0){
      throw new Error("Out on bounds");
    }
    return this.layers[layer][x * this.height + y];
  }
}
