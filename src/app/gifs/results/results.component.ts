import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent{

  // TODO: check how get works
  get results(){
    return this.gifsService.results;
  }

  constructor(
    private gifsService: GifsService
  ) { }

}
