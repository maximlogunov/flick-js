import React from "react";
import "./Rail.css";

interface RailItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface RailProps {
  title: string;
  items: RailItem[];
  onItemClick: (item: RailItem) => void;
}

export const Rail: React.FC<RailProps> = ({ title, items, onItemClick }) => {
  return (
    <div className="rail">
      <h2 className="rail-title">{title}</h2>
      <div className="rail-content">
        {items.map((item) => (
          <div
            key={item.id}
            className="rail-item"
            onClick={() => onItemClick(item)}
          >
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
