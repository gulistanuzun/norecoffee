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
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'],
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
    images: ['https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800'],
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
    images: ['https://images.unsplash.com/photo-1461988091159-192b6df7054f?w=800'],
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
    images: ['https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800'],
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
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800'],
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
    images: ['https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=800'],
    stock: 36,
    featured: false,
  },
  {
    name: 'Sidamo Bloom',
    slug: 'sidamo-bloom',
    description:
      'A fragrant Ethiopian Sidamo with a light body, bursting with blueberry and jasmine notes and a delicate wine-like acidity.',
    origin: 'Ethiopia, Sidamo',
    roastLevel: 'light',
    tastingNotes: ['blueberry', 'jasmine', 'lime'],
    process: 'natural',
    price: 19.5,
    images: ['https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800'],
    stock: 40,
    featured: false,
  },
  {
    name: 'Blue Mountain Reserve',
    slug: 'blue-mountain-reserve',
    description:
      'One of the rarest coffees in the world, grown in the misty Blue Mountains of Jamaica — mild, exceptionally smooth, with a delicate sweetness.',
    origin: 'Jamaica, Blue Mountain',
    roastLevel: 'medium',
    tastingNotes: ['brown sugar', 'herb', 'mild citrus'],
    process: 'washed',
    price: 46.0,
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'],
    stock: 10,
    featured: true,
  },
  {
    name: 'Nitro Cold Brew Blend',
    slug: 'nitro-cold-brew-blend',
    description:
      'A Brazil–Vietnam blend engineered for cold brewing: heavy body, low acidity, and a naturally sweet, chocolatey finish.',
    origin: 'Brazil / Vietnam blend',
    roastLevel: 'dark',
    tastingNotes: ['dark chocolate', 'molasses', 'toasted almond'],
    process: 'natural',
    price: 17.0,
    images: ['https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800'],
    stock: 50,
    featured: false,
  },
  {
    name: 'Morning Fog Espresso Blend',
    slug: 'morning-fog-espresso-blend',
    description:
      'A house espresso blend built for crema and balance — notes of caramel and roasted hazelnut with a syrupy, rounded body.',
    origin: 'Colombia / Guatemala blend',
    roastLevel: 'medium-dark',
    tastingNotes: ['caramel', 'roasted hazelnut', 'cocoa'],
    process: 'washed',
    price: 18.0,
    images: ['https://images.unsplash.com/photo-1518057111178-44a106bad636?w=800'],
    stock: 45,
    featured: false,
  },
  {
    name: 'Oaxaca Pluma',
    slug: 'oaxaca-pluma',
    description:
      'A silky Mexican Pluma varietal with gentle acidity, notes of red apple and brown spice, and a clean, lingering finish.',
    origin: 'Mexico, Oaxaca',
    roastLevel: 'medium',
    tastingNotes: ['red apple', 'brown spice', 'cane sugar'],
    process: 'washed',
    price: 18.5,
    images: ['https://images.unsplash.com/photo-1522992319-0365e5f11656?w=800'],
    stock: 33,
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
