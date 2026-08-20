import { connectDB } from '../config/db.js';
import { Product } from '../models/Product.js';
import mongoose from 'mongoose';

const products = [
  {
    name: 'Yirgacheffe Sunrise',
    slug: 'yirgacheffe-sunrise',
    description:
      'A bright, floral cup from the birthplace of coffee. Delicate jasmine aromatics give way to a clean, tea-like body with a honeyed finish.',
    origin: 'Ethiopia, Yirgacheffe',
    roastLevel: 'light',
    tastingNotes: ['jasmine', 'bergamot', 'honey'],
    process: 'washed',
    price: 18.5,
    images: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800'],
    stock: 42,
    featured: true,
  },
  {
    name: 'Huila Reserve',
    slug: 'huila-reserve',
    description:
      'Grown high in the Colombian Andes, this lot balances juicy red-fruit acidity with a silky caramel body.',
    origin: 'Colombia, Huila',
    roastLevel: 'medium',
    tastingNotes: ['red apple', 'caramel', 'brown sugar'],
    process: 'washed',
    price: 17.0,
    images: ['https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800'],
    stock: 55,
    featured: true,
  },
  {
    name: 'Sumatra Mandheling',
    slug: 'sumatra-mandheling',
    description:
      'Earthy and full-bodied with a syrupy mouthfeel, this wet-hulled Indonesian lot is a favorite for a bold, low-acid cup.',
    origin: 'Indonesia, Sumatra',
    roastLevel: 'dark',
    tastingNotes: ['cedar', 'dark chocolate', 'clove'],
    process: 'wet-hulled',
    price: 16.5,
    images: ['https://images.unsplash.com/photo-1524350876685-274059332603?w=800'],
    stock: 38,
    featured: false,
  },
  {
    name: 'Nyeri Peaberry',
    slug: 'nyeri-peaberry',
    description:
      'A vivid, wine-like Kenyan peaberry with signature black-currant acidity and a long, tomato-savory finish.',
    origin: 'Kenya, Nyeri',
    roastLevel: 'light',
    tastingNotes: ['black currant', 'tomato', 'grapefruit'],
    process: 'washed',
    price: 21.0,
    images: ['https://images.unsplash.com/photo-1587734195342-5ac67a3a2c8b?w=800'],
    stock: 24,
    featured: true,
  },
  {
    name: 'Antigua Volcán',
    slug: 'antigua-volcan',
    description:
      'Grown in volcanic soil around Antigua, this cup delivers a classic balance of cocoa, spice, and gentle citrus.',
    origin: 'Guatemala, Antigua',
    roastLevel: 'medium',
    tastingNotes: ['cocoa', 'cinnamon', 'orange zest'],
    process: 'washed',
    price: 17.5,
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
    stock: 47,
    featured: false,
  },
  {
    name: 'Minas Gerais Natural',
    slug: 'minas-gerais-natural',
    description:
      'A sun-dried Brazilian natural with a heavy, chocolatey body and notes of dried fruit and toasted nuts.',
    origin: 'Brazil, Minas Gerais',
    roastLevel: 'medium-dark',
    tastingNotes: ['hazelnut', 'raisin', 'milk chocolate'],
    process: 'natural',
    price: 15.5,
    images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800'],
    stock: 60,
    featured: false,
  },
  {
    name: 'Tarrazú Estate',
    slug: 'tarrazu-estate',
    description:
      'A crisp, high-altitude Costa Rican coffee with bright citrus acidity and a clean, honey-sweet finish.',
    origin: 'Costa Rica, Tarrazú',
    roastLevel: 'light',
    tastingNotes: ['lemon', 'honey', 'almond'],
    process: 'honey',
    price: 19.0,
    images: ['https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800'],
    stock: 33,
    featured: false,
  },
  {
    name: 'Toraja Highland',
    slug: 'toraja-highland',
    description:
      'A rare, complex Sulawesi lot with herbal spice, dark chocolate, and a heavy, velvety body.',
    origin: 'Indonesia, Sulawesi',
    roastLevel: 'dark',
    tastingNotes: ['dark chocolate', 'clove', 'cedar'],
    process: 'wet-hulled',
    price: 22.0,
    images: ['https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800'],
    stock: 19,
    featured: false,
  },
  {
    name: 'Chiapas Cloud Forest',
    slug: 'chiapas-cloud-forest',
    description:
      'Shade-grown in the misty highlands of Chiapas, this organic lot offers gentle acidity and notes of plum and cane sugar.',
    origin: 'Mexico, Chiapas',
    roastLevel: 'medium',
    tastingNotes: ['plum', 'cane sugar', 'walnut'],
    process: 'washed',
    price: 16.0,
    images: ['https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800'],
    stock: 51,
    featured: false,
  },
  {
    name: 'Kona Sunrise',
    slug: 'kona-sunrise',
    description:
      'A rare and prized Hawaiian coffee, smooth and low-acid with delicate notes of macadamia and brown butter.',
    origin: 'USA, Hawaii - Kona',
    roastLevel: 'medium',
    tastingNotes: ['macadamia', 'brown butter', 'vanilla'],
    process: 'washed',
    price: 34.0,
    images: ['https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800'],
    stock: 12,
    featured: true,
  },
  {
    name: 'Panama Geisha',
    slug: 'panama-geisha',
    description:
      'The most celebrated varietal in specialty coffee — an ethereal, tea-like cup bursting with jasmine and stone fruit.',
    origin: 'Panama, Boquete',
    roastLevel: 'light',
    tastingNotes: ['jasmine', 'peach', 'bergamot'],
    process: 'washed',
    price: 42.0,
    images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800'],
    stock: 8,
    featured: true,
  },
  {
    name: 'Java Estate Dark',
    slug: 'java-estate-dark',
    description:
      'A traditional, heavy-bodied Indonesian dark roast with smoky, spiced notes and a bittersweet cocoa finish.',
    origin: 'Indonesia, Java',
    roastLevel: 'dark',
    tastingNotes: ['smoke', 'bittersweet cocoa', 'allspice'],
    process: 'washed',
    price: 15.0,
    images: ['https://images.unsplash.com/photo-1524350876685-274059332603?w=800'],
    stock: 44,
    featured: false,
  },
  {
    name: 'Rwanda Musasa',
    slug: 'rwanda-musasa',
    description:
      'A vibrant East African lot with juicy red-berry acidity and a delicate floral aroma.',
    origin: 'Rwanda, Musasa',
    roastLevel: 'light',
    tastingNotes: ['raspberry', 'hibiscus', 'lime'],
    process: 'washed',
    price: 20.0,
    images: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800'],
    stock: 27,
    featured: false,
  },
  {
    name: 'El Salvador Pacamara',
    slug: 'el-salvador-pacamara',
    description:
      'A large-bean varietal with a creamy body, balanced sweetness, and notes of caramel and green apple.',
    origin: 'El Salvador, Ahuachapán',
    roastLevel: 'medium',
    tastingNotes: ['caramel', 'green apple', 'toffee'],
    process: 'honey',
    price: 18.0,
    images: ['https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800'],
    stock: 36,
    featured: false,
  },
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
