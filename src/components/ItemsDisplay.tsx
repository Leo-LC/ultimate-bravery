type Item = {
  name: string;
  image: string;
};

type ItemsDisplayProps = {
  items: Item[]; // Les 5 items sélectionnés
  boot: Item; // Les boots sélectionnés
  enchant: Item; // L'enchantement sélectionné
};

function ItemsDisplay({ items, boot, enchant }: ItemsDisplayProps) {
  return (
    <div className='items-display'>
      <h2>Items</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <img
              src={item.image}
              alt={item.name}
            />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      <div className='items-bottom'>
        <div className='boots-wrapper'>
          <h2>Boots</h2>
          <div className='boots-display'>
            <img
              src={boot.image}
              alt={boot.name}
            />
            <p>{boot.name}</p>
          </div>
        </div>
        <div className='enchant-wrapper'>
          <h2>Enchantment</h2>
          <div className='enchant-display'>
            <img
              src={enchant.image}
              alt={enchant.name}
            />
            <p>{enchant.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsDisplay;
