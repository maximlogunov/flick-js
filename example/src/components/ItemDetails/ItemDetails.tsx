import React from "react";
import "./ItemDetails.css";

interface ItemDetailsProps {
  item: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
  onBack: () => void;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onBack }) => {
  return (
    <div className="item-details">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <div className="item-content">
        <img src={item.image} alt={item.title} className="item-image" />
        <div className="item-info">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
};
