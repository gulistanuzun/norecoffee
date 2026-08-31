import { HeroSection } from '../components/home/HeroSection.jsx';
import { FeaturedProducts } from '../components/home/FeaturedProducts.jsx';
import { BrandStory } from '../components/home/BrandStory.jsx';

export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
    </>
  );
}
