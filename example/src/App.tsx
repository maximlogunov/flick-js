import { useState } from "react";
import { Rail } from "./components/Rail/Rail";
import { ItemDetails } from "./components/ItemDetails/ItemDetails";
import { mockData, Item } from "./data/mockData";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeRailIndex, setActiveRailIndex] = useState(0);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setActiveRailIndex(0);
  };

  return (
    <div className="app">
      {selectedItem ? (
        <ItemDetails item={selectedItem} onBack={handleBack} />
      ) : (
        <div className="home">
          <Rail
            title={mockData.featured.title}
            items={mockData.featured.items}
            onItemClick={handleItemClick}
            isActive={activeRailIndex === 0}
          />
          <Rail
            title={mockData.trending.title}
            items={mockData.trending.items}
            onItemClick={handleItemClick}
            isActive={activeRailIndex === 1}
          />
        </div>
      )}
    </div>
  );
}

export default App;
