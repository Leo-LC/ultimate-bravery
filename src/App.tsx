import React, { useEffect } from "react";
import ChampionDisplay from "./components/ChampionDisplay";
import ItemsDisplay from "./components/ItemsDisplay";
import ControlButtons from "./components/ControlButtons";
import { useRandomizer } from "./data/useRandomizer";

import "./App.css";

function App() {
  const {
    randomChampion,
    randomItems,
    randomBoots,
    randomEnchant,
    randomizeAll,
  } = useRandomizer();

  // Randomize les données au chargement
  useEffect(() => {
    randomizeAll();
  }, []); // Appelé une seule fois au montage du composant

  return (
    <>
      <h1>Welcome to Wild Rift Ultimate Bravery</h1>
      <ChampionDisplay champion={randomChampion} />
      <ItemsDisplay
        items={randomItems}
        boot={randomBoots}
        enchant={randomEnchant}
      />
      <ControlButtons onRandomizeAll={randomizeAll} />
    </>
  );
}

export default App;
