import { Component, OnInit } from '@angular/core';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { PokemonModel } from 'src/app/models/pokemon.model';
import { GeolocationService } from './../../services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemons: PokemonModel[] = [];
  lat = null;
  lng = null;

  constructor(
    private ps: PokemonsService,
    private geo: GeolocationService
  ) { }

  ngOnInit(): void {
    this.geo.getPosition()
      .then( data => {
        this.lat = data.lat;
        this.lng = data.lng;
      });
    this.ps.all()
      .subscribe(
        (data: PokemonModel[]) => this.pokemons = data
      );
  }

  del(pokemon: PokemonModel): void {
    this.ps.delete(pokemon)
      .subscribe(data => {
        this.pokemons = this.pokemons.filter(p => {
          return p.id !== pokemon.id;
        });
      });
  }
}
