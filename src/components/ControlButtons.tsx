type ControlButtonsProps = {

  onRandomizeAll: () => void;
};

function ControlButtons({

  onRandomizeAll,
}: ControlButtonsProps) {
  return (
    <div className='control-buttons'>
     {/*   <button onClick={onRandomizeChampion}>Randomize Champion</button>  
      <button onClick={onRandomizeItems}>Randomize Items</button> */}
      <button onClick={onRandomizeAll}>Randomize All</button>
    </div>
  );
}

export default ControlButtons;
