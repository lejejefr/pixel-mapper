export class CreateMapRequest{
  constructor(
    readonly title : string,
    readonly description : string,
    readonly width : number,
    readonly height : number,
  ){

  }
}
