import { useState } from "react";
import data from "./data.json";

export function useRandomizer() {
  const [randomChampion, setRandomChampion] = useState(data.champions[0]);
  const [randomItems, setRandomItems] = useState(data.items.slice(0, 5));
  const [randomBoots, setRandomBoots] = useState(data.boots[0]);
  const [randomEnchant, setRandomEnchant] = useState(data.enchant[0]);

  // Randomize all data
  const randomizeAll = () => {
    setRandomChampion(data.champions[Math.floor(Math.random() * data.champions.length)]);
    setRandomItems(data.items.sort(() => Math.random() - 0.5).slice(0, 5));
    setRandomBoots(data.boots[Math.floor(Math.random() * data.boots.length)]);
    setRandomEnchant(data.enchant[Math.floor(Math.random() * data.enchant.length)]);
  };

  // Retourne tout ce qui est nécessaire
  return {
    randomChampion,
    randomItems,
    randomBoots,
    randomEnchant,
    randomizeAll,
  };
}
