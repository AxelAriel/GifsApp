import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})



export class GifsService {

  public gifsList: Gif[] = [];
  
  private _tagsHistory:   string[] = [];
  private  GIPHY_API_KEY: string = '7QYR3U7t9LFvJqAiMQ4Ss0WqBt8If7OC';  
  private serviceUrl:     string = 'https://api.giphy.com/v1/gifs';
  

  constructor( private http: HttpClient) { }
  
  get tagsHistory() {    
    return [...this._tagsHistory];
  }  
  
  private organizeHistory( tag: string ){

    tag = tag.toLowerCase();    
    if( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift( tag );
    // console.log(this.tagHistory);
    this._tagsHistory = this.tagsHistory.splice(0,10);

  }
  
  searchTag( tag: string ):void {
    
    if( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set( 'api_key', this.GIPHY_API_KEY )
    .set( 'limit','10' )
    .set( 'q',tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search?`,{ params})
    .subscribe( resp => {

      this.gifsList = resp.data;
      // console.log( { gifs : this.gifsList } );
       
    } )        
  }

}
