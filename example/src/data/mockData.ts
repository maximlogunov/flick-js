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
        image: "https://picsum.photos/400/300?random=1",
        description:
          "An epic journey through mystical lands and ancient ruins. Follow our heroes as they uncover the secrets of a forgotten civilization.",
      },
      {
        id: "2",
        title: "Mystery of the Deep",
        image: "https://picsum.photos/400/300?random=2",
        description:
          "Dive into the depths of the ocean in this thrilling underwater adventure. Discover new species and ancient shipwrecks.",
      },
      {
        id: "3",
        title: "Space Odyssey",
        image: "https://picsum.photos/400/300?random=3",
        description:
          "Travel through the cosmos in this groundbreaking space exploration series. Witness the wonders of distant galaxies.",
      },
    ],
  },
  trending: {
    title: "Trending Now",
    items: [
      {
        id: "4",
        title: "Culinary Masters",
        image: "https://picsum.photos/400/300?random=4",
        description:
          "Watch world-renowned chefs create extraordinary dishes in this culinary masterpiece series.",
      },
      {
        id: "5",
        title: "Wildlife Chronicles",
        image: "https://picsum.photos/400/300?random=5",
        description:
          "Experience the raw beauty of nature through the eyes of wildlife photographers and researchers.",
      },
      {
        id: "6",
        title: "Tech Revolution",
        image: "https://picsum.photos/400/300?random=6",
        description:
          "Explore the cutting-edge innovations shaping our future in this technology documentary series.",
      },
    ],
  },
};
