export default function BrandsSection() {
  const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'CALVIN KLEIN']
  
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex  flex-wrap justify-center items-center gap-6 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-xl md:text-2xl font-bold text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}