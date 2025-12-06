import HeroSection from '@/components/HeroSection'
import BrandsSection from '@/components/BrandsSection'
import ProductsGrid from '@/components/ProductsGrid'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import DressStyleGrid from '@/components/BrowseByDressStyle'


export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <ProductsGrid />
        <DressStyleGrid />
      <Testimonials />
      <Footer />
    
    </>
  )
}