import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../Interfaces/episode';
import { EpisodeAll } from '../Interfaces/episode-all';
import { CharacterAll } from '../Interfaces/character-all';
import { Character } from '../Interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {
  private urlApi= 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<EpisodeAll>{
    return this.http.get<EpisodeAll>(this.urlApi + "/episode");
  }

  getEpisodeDetail(idEpisode: number): Observable<Episode>{
    return this.http.get<Episode>(this.urlApi + "/episode/" + idEpisode);
  }

  getCharacters(): Observable<CharacterAll>{
    return this.http.get<CharacterAll>(this.urlApi + "/character");
  }

  getCharacterDetail(idCharacter: number): Observable<Character>{
    return this.http.get<Character>(this.urlApi + "/character/" + idCharacter);
  }
}
