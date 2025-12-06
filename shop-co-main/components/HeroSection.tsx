'use client'

import { ArrowRightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { FC } from 'react'

const HeroSection: FC = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
       
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>
          
          <button className="bg-black hover:bg-gray-800 text-white h-12 px-8 rounded-full flex items-center gap-2 transition-colors font-medium">
            Shop Now
            <ArrowRightOutlined />
          </button>
          
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200">
            <div>
              <h3 className="text-3xl font-bold text-black">200+</h3>
              <p className="text-gray-600">International Brands</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black">2,000+</h3>
              <p className="text-gray-600">High-Quality Products</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black">30,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
        
     
        <div className="lg:w-1/2">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src="https://i.ibb.co/m5f2WT7J/hero-fashion.jpg"
              alt="Fashion model wearing stylish clothes"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

       
      </div>
    </section>
  )
}

export default HeroSection