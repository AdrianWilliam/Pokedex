import React, { useEffect, useState } from "react";
import styles from "./Pokemons.module.css";
import { Link } from "react-router-dom";
function Pokemons() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    function getPokemons() {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then((res) => {
          const result = res.results;
          const promises = result.map((i) => {
            return fetch(i.url).then((res) => res.json());
          });
          Promise.all(promises).then((result) => setPokemon(result));
        })
        .finally(() => {
          caches
            .open("poke")
            .then((cache) => cache.add("https://pokeapi.co/api/v2/pokemon"));
        });
    }

    getPokemons();
  }, []);
  const Pokemon = ({ details, img }) => {
    return (
      <div className={styles.pokemon}>
        <Link to={`/pokemon/${details.name}`}>
          <img src={img} alt="pokemon image" />
        </Link>
        <p className={styles.pokemonName}>{details.name}</p>
      </div>
    );
  };
  return (
    <div className={styles.pokemons}>
      {pokemon.map((item) => (
        <Pokemon
          key={item.name}
          img={item.sprites.front_default}
          details={item}
        />
      ))}
    </div>
  );
}

export default Pokemons;
