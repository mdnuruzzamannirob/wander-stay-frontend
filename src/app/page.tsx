import Banner from '@/components/modules/home/Banner';
import FeaturedHotels from '@/components/modules/home/FeaturedHotels';
import PopularDestinations from '@/components/modules/home/PopularDestinations';
import FaqSection from '@/components/modules/home/FaqSection';

export const metadata = {
  title: 'WanderStay - Find Your Perfect Luxury Getaway',
  description:
    'Discover your ideal luxury vacation with WanderStay. Transparent prices, flexible cancellation, and secure payments - without hidden fees or pressure tactics.',
};

const HomePage = () => {
  return (
    <>
      <Banner />
      <FeaturedHotels />
      <PopularDestinations />
      <FaqSection />
    </>
  );
};

export default HomePage;
