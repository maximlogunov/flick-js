import React, { useEffect, useRef } from "react";
import { FocusManager } from "flick-js";
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
  isActive?: boolean;
}

export const Rail: React.FC<RailProps> = ({
  title,
  items,
  onItemClick,
  isActive = false,
}) => {
  const railRef = useRef<HTMLDivElement>(null);
  const focusManagerRef = useRef<FocusManager | null>(null);

  useEffect(() => {
    if (railRef.current && isActive) {
      focusManagerRef.current = new FocusManager({
        focusableSelector: ".rail-item",
        defaultFocusKey: items[0]?.id,
      });

      // Register all elements as focusable
      items.forEach((item) => {
        const element = railRef.current?.querySelector(
          `[data-id="${item.id}"]`,
        ) as HTMLElement;
        if (element) {
          focusManagerRef.current?.registerFocusable(element, item.id);
          element.addEventListener("focus", () =>
            element.classList.add("focused"),
          );
          element.addEventListener("blur", () =>
            element.classList.remove("focused"),
          );
        }
      });

      return () => {
        focusManagerRef.current?.destroy();
      };
    }
  }, [isActive, items]);

  return (
    <div className="rail">
      <h2 className="rail-title">{title}</h2>
      <div className="rail-content" ref={railRef}>
        {items.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className="rail-item"
            onClick={() => onItemClick(item)}
            tabIndex={0}
          >
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
