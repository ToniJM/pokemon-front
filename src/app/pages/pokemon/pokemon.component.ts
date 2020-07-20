import { Component, OnInit } from '@angular/core';
import { PokemonsService } from './../../services/pokemons.service';
import { NgForm } from '@angular/forms';

import { PokemonModel } from 'src/app/models/pokemon.model';
import { PokemonDBService } from './../../services/pokemon-db.service';
import { GeolocationService } from './../../services/geolocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  error: {
    nickname?: string,
    pokemonId?: string
  } = {};
  pokemon: PokemonModel = new PokemonModel();
  mapLat = null;
  mapLng = null;
  pokemonLat = null;
  pokemonLng = null;
  pokemonList = [];

  constructor(
    private pokemons: PokemonsService,
    private pokemonDB: PokemonDBService,
    private geolocation: GeolocationService,
    private router: Router) { }

  ngOnInit(): void {
    this.geolocation.getPosition()
      .then(data => {
        this.mapLat = data.lat;
        this.mapLng = data.lng;
      });
    this.geolocation.getRandomPoint()
      .then(data => {
        this.pokemonLat = data.lat;
        this.pokemonLng = data.lng;
      });
    this.pokemonList = this.pokemonDB.all().map((data, i) => {
      return {
        id: i + 1,
        text: data.name
      };
    });
    console.log(this.pokemonList);
  }

  store(form: NgForm) {

    if (this.pokemon.pokemonId) {
      this.pokemon.pokemon = this.pokemonDB.get(this.pokemon.pokemonId).name;
    }

    this.pokemon.lat = this.pokemonLat;
    this.pokemon.lng = this.pokemonLng;

    this.pokemons.create(this.pokemon)
      .subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
  }

  handleResponse(data): void {
    this.router.navigateByUrl('home');
  }

  handleError(error): void {
    this.error = error.error.errors;
  }

}
