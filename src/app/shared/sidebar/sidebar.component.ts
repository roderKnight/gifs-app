import { Component } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interface';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{


  constructor(  private gifsService: GifsService  ){
  }

  get historial(){
    return this.gifsService.historial;
  }

  search(value:string){
    this.gifsService.searchGifs(value);
    // historial = console.log(value)
  }
  

}
