export class NavListElementProps{


  constructor(
    public mapId : String,
    public createdAt : Date,
    public lastUpdate : Date,
    public title : String,
    public description : String,
    public isToggled : boolean
  ){

  }

  public toggle() : boolean{
    this.isToggled = !this.isToggled;
    return this.isToggled;
  }
}
