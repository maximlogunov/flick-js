import React, { useEffect, useRef } from "react";
import { FocusManager } from "flick-js";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const focusManagerRef = useRef<FocusManager | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      focusManagerRef.current = new FocusManager({
        focusableSelector: "button",
        defaultFocusKey: "back-button",
      });

      const backButton = containerRef.current.querySelector(
        ".back-button",
      ) as HTMLElement;
      if (backButton) {
        focusManagerRef.current.registerFocusable(backButton, "back-button");
      }

      return () => {
        focusManagerRef.current?.destroy();
      };
    }
  }, []);

  return (
    <div className="item-details" ref={containerRef}>
      <button className="back-button" onClick={onBack} tabIndex={0}>
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
