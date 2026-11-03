import heroJar from "@/assets/chil-blueberry-original.jpeg";

export const BUSINESS = {
  name: "Chil by Penguin",
  phone: "+91 7735661162",
  phoneDigits: "917735661162",
  address: "375, Saheed Nagar, Bhubaneswar, Odisha 751007, India",
  instagram: "https://www.instagram.com/chilbypenguin/",
  mapsUrl:
    "https://www.google.com/maps/place/BITE+OF+BLISS/@20.2893134,85.8414249,17.25z/data=!4m6!3m5!1s0x3a190900668c5aa1:0x1733cca9b53fd0e!8m2!3d20.2891901!4d85.8442366!16s%2Fg%2F11w4khwsfm",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=20.2891901,85.8442366",
  embedUrl: "https://www.google.com/maps?q=20.2891901,85.8442366&z=16&output=embed",
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  size: string;
  price: number; // INR — placeholder until confirmed by client
  images: string[];
  highlights: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "chil-blueberry",
    name: "Chil Blueberry",
    tagline: "Sparkling Fruit Drink",
    description:
      "A sparkling fruit drink loaded with real blueberry bits for a refreshing experience in every sip.",
    size: "250 ml jar",
    price: 99,
    images: [heroJar],
    highlights: [
      "Real blueberry bits",
      "Added Vitamin C",
      "Sweetened with Mishri",
      "No refined sugar",
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const whatsappLink = (text: string) =>
  `https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent(text)}`;
