import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private URLservice: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '3J3J0g8swOnsCRQedE3JkRGHPpdHAZzD';

  // TODO: Cambiar any por su tipo correspondiente
  public results: Gif[] = []

  get historial(){
    //this._historial = this._historial.splice(0, 10); //corta a max 10
    return [...this._historial]; //rompe la referencia y regresa con un nuevo arreglo
  }

  constructor( private http: HttpClient ){

    
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.results = JSON.parse( localStorage.getItem('results')! ) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }

  }

  searchGifs(query:string){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=3J3J0g8swOnsCRQedE3JkRGHPpdHAZzD&q=sponge bob&limit=10')
    //   .then( res =>{
    //     res.json().then( data =>{
    //       console.log(data);
    //     })
    //   })

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.URLservice }/search`, { params })
      .subscribe( (resp) =>{
        console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify( this.results ));
      })
    console.log(this._historial);
    console.log(this.results);
  }
  
}
