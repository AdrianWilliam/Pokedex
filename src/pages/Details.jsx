import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
function Details() {
  const { name } = useParams();
  const [pokemonSelected, setPokemonSelected] = useState(null);

  useEffect(() => {
    let url;
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((res) => {
        const results = res.results;
        const actualUrl = results
          .filter((i) => i.name == name)
          .map((i) => i.url);
        url = actualUrl;
        const pokemonDetails = results.map((pokemon) => {
          return fetch(pokemon.url).then((res) => res.json());
        });
        Promise.all(pokemonDetails).then((result) => {
          result
            .filter((i) => i.name == name)
            .map((i) => setPokemonSelected(i));
        });
      })
      .finally(() => {
        caches.open("details").then((cache) => cache.add(url));
      });
  }, []);

  const Pokemon = () => {
    const pokemon = {
      name: pokemonSelected.name,
      img: pokemonSelected.sprites.front_default,
      stats: {
        hp: pokemonSelected.stats.find(
          (i) => i.stat.name === "hp"
        ),

        attack: pokemonSelected.stats.find(
          (i) => i.stat.name === "attack"
        ),

        defense: pokemonSelected.stats.find(
          (i) => i.stat.name === "defense"
        ),

        special_attack: pokemonSelected.stats.find(
          (i) => i.stat.name === "special-attack"
        ),

        special_defense: pokemonSelected.stats.find(
          (i) => i.stat.name === "special-defense"
        ),

        speed: pokemonSelected.stats.find(
          (i) => i.stat.name === "speed"
        ),
      },
    };
    return (
      <div className={styles.pokemon}>
        <div className={styles.pokemonImg}>
          <img src={pokemon.img} alt="" />
        </div>
        <div className={styles.pokemonData}>
          <p>{`NAME: ${pokemon.name}`}</p>
          <div className={styles.statBase}>
            <p>{`HP: ${pokemon.stats.hp.base_stat}`}</p>
            <div
              className={styles.statsBar}
              style={{ width: pokemon.stats.hp.base_stat }}
            ></div>
          </div>
          <div className={styles.statBase}>
            <p>{`ATTACK: ${pokemon.stats.attack.base_stat}`}</p>
            <div
              className={styles.statsBar}
              style={{ width: pokemon.stats.attack.base_stat }}
            ></div>
          </div>
          <div className={styles.statBase}>
            <p>{`DEFENSE: ${pokemon.stats.defense.base_stat}`}</p>
            <div
              className={styles.statsBar}
              style={{ width: pokemon.stats.defense.base_stat }}
            ></div>
          </div>
          <div className={styles.statBase}>
            <p>{`SPECIAL ATTACK: ${pokemon.stats.special_attack.base_stat}`}</p>
            <div
              className={styles.statsBar}
              style={{ width: pokemon.stats.special_attack.base_stat }}
            ></div>
          </div>
          <div className={styles.statBase}>
            <p>{`SPECIAL DEFENSE: ${pokemon.stats.special_defense.base_stat}`}</p>
            <div
              className={styles.statsBar}
              style={{ width: pokemon.stats.special_defense.base_stat }}
            ></div>
          </div>
          <div className={styles.statBase}>
            <p>{`SPEED: ${pokemon.stats.speed.base_stat}`}</p>
            <div
              className={styles.statsBar}
              style={{ width: pokemon.stats.speed.base_stat }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.pokemonContainer}>
      {pokemonSelected && <Pokemon />}
    </div>
  );
}

export default Details;
