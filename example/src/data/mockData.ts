export interface Item {
  id: string;
  title: string;
  image: string;
  description: string;
}

export const mockData = {
  featured: {
    title: "Featured Content",
    items: [
      {
        id: "1",
        title: "The Adventure Begins",
        image: "https://picsum.photos/id/10/400/300",
        description:
          "An epic journey through mystical lands and ancient ruins. Follow our heroes as they uncover the secrets of a forgotten civilization.",
      },
      {
        id: "2",
        title: "Mystery of the Deep",
        image: "https://picsum.photos/id/20/400/300",
        description:
          "Dive into the depths of the ocean in this thrilling underwater adventure. Discover new species and ancient shipwrecks.",
      },
      {
        id: "3",
        title: "Space Odyssey",
        image: "https://picsum.photos/id/30/400/300",
        description:
          "Travel through the cosmos in this groundbreaking space exploration series. Witness the wonders of distant galaxies.",
      },
      {
        id: "7",
        title: "Mountain Expeditions",
        image: "https://picsum.photos/id/70/400/300",
        description:
          "Join experienced climbers as they tackle the world's most challenging peaks and reveal the beauty of mountain landscapes.",
      },
      {
        id: "8",
        title: "Desert Mysteries",
        image: "https://picsum.photos/id/80/400/300",
        description:
          "Explore the secrets of ancient desert civilizations and witness the harsh beauty of the world's most extreme environments.",
      },
      {
        id: "9",
        title: "Jungle Tales",
        image: "https://picsum.photos/id/90/400/300",
        description:
          "Venture deep into the rainforest to discover rare species and learn about the delicate balance of these vital ecosystems.",
      },
    ],
  },
  trending: {
    title: "Trending Now",
    items: [
      {
        id: "4",
        title: "Culinary Masters",
        image: "https://picsum.photos/id/40/400/300",
        description:
          "Watch world-renowned chefs create extraordinary dishes in this culinary masterpiece series.",
      },
      {
        id: "5",
        title: "Wildlife Chronicles",
        image: "https://picsum.photos/id/50/400/300",
        description:
          "Experience the raw beauty of nature through the eyes of wildlife photographers and researchers.",
      },
      {
        id: "6",
        title: "Tech Revolution",
        image: "https://picsum.photos/id/60/400/300",
        description:
          "Explore the cutting-edge innovations shaping our future in this technology documentary series.",
      },
      {
        id: "10",
        title: "Urban Stories",
        image: "https://picsum.photos/id/100/400/300",
        description:
          "Discover the hidden stories of city life, from underground art scenes to innovative urban development projects.",
      },
      {
        id: "11",
        title: "Musical Journey",
        image: "https://picsum.photos/id/110/400/300",
        description:
          "Travel the world exploring different musical traditions and meeting the artists who keep them alive.",
      },
      {
        id: "12",
        title: "Extreme Sports",
        image: "https://picsum.photos/id/120/400/300",
        description:
          "Follow adrenaline seekers as they push the boundaries of what's possible in extreme sports.",
      },
      {
        id: "13",
        title: "Historical Mysteries",
        image: "https://picsum.photos/id/130/400/300",
        description:
          "Uncover the truth behind history's greatest mysteries and legends with expert historians and archaeologists.",
      },
      {
        id: "14",
        title: "Future Cities",
        image: "https://picsum.photos/id/140/400/300",
        description:
          "See how cities are evolving to meet the challenges of tomorrow with sustainable technology and innovative design.",
      },
    ],
  },
};
