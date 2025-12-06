'use client'

import { FC } from 'react'
import { StarFilled } from '@ant-design/icons'

interface TestimonialCardProps {
  name: string
  rating: number
  content: string
}

const TestimonialCard: FC<TestimonialCardProps> = ({ name, rating, content }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarFilled key={i} className="!text-yellow-400 text-lg" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 text-sm md:text-base">{content}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="font-bold">{name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
        </div>
      </div>
    </div>
  )
}

const Testimonials: FC = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      content: "The quality and style of the clothes exceeded my expectations. Every purchase feels like an elegant dream, every time I've bought from here I've been thrilled with my experience."
    },
    {
      name: "Alex K.",
      rating: 5,
      content: "Trying another brand was never an option since I discovered Shop.CO. The fabric quality and attention to detail is exceptional, making every piece worth every penny."
    },
    {
      name: "James L.",
      rating: 5,
      content: "No one who's always on the lookout for trendy fashion pieces should miss out on this store. Their selection is one of the best online with the latest styles on point."
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">
          OUR HAPPY CUSTOMERS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials