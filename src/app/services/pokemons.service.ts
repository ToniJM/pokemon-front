import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonModel } from '../models/pokemon.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  create(pokemon: PokemonModel) {
    return this.http.post(environment.apiUrl + 'pokemon', pokemon);
  }

  all() {
    return this.http.get(environment.apiUrl + 'pokemon');
  }

  delete(pokemon: PokemonModel) {
    return this.http.delete(environment.apiUrl + 'pokemon/' + pokemon.id)
  }
}
