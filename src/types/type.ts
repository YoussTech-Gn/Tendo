// export interface Res {
//   name: string;
//   url: string;
// }

export interface Res {
  name: string;
  url: string;
}

export interface PokemonCard {
  name: string;
  types: string[]; // ["fire", "flying"]
  front: string;
  back: string;
}

export interface Pokemontype {
  type: {
    name: string;
    url: string;
  };
}
export interface PokemonDetails {
  name: string;
  baseExperience: number;
  frontShiny: string;
  backShiny: string;
}
