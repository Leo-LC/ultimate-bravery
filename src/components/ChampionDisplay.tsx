type Champion = {
  name: string;
  image: string;
  roles: string[];
};

type ChampionDisplayProps = {
  champion?: Champion; // Le champion est optionnel
};

function ChampionDisplay({ champion }: ChampionDisplayProps) {
  // Si aucun champion n'est sélectionné, afficher un message par défaut
  if (!champion) {
    return <p>Click "Randomize Champion" to display a champion!</p>;
  }

  return (
    <div className="champion-display">
      <h2>{champion.name}</h2>
      <img src={champion.image} alt={champion.name} />

    </div>
  );
}

export default ChampionDisplay;
