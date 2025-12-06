'use client'

import React from 'react'
import { Button, Rate } from 'antd'
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons'
import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    rating: number
    image?: string
    category?: string
    description?: string
  }
  imageIndex: number
}

const productImages = [
  'https://i.ibb.co/9jSm21c/product1.jpg',
  'https://i.ibb.co/7JGRbNKB/product2.jpg',
  'https://i.ibb.co/xqf5yGJ9/product3.jpg',
  'https://i.ibb.co/1J9cPKq1/product4.jpg',
  'https://i.ibb.co/W4Y59phN/product5.jpg',
  'https://i.ibb.co/pB9LkRhB/product6.jpg',
  'https://i.ibb.co/pjYQS7Lq/product7.jpg',
  'https://i.ibb.co/bMCCN9Cf/product8.jpg',
]

const ProductCard: React.FC<ProductCardProps> = ({ product, imageIndex }) => {
  const { cart, addToCart, removeFromCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const productImage = productImages[imageIndex % productImages.length]


  const cartItem = cart.find(item => item.id === product.id)
  const isInCart = !!cartItem


  const liked = isFavorite(product.id)

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id)
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: productImage,
        category: product.category,
      })
    }
  }

  const handleLikeClick = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: productImage,
      category: product.category,
      rating: product.rating
    })
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col bg-white">

      <div className="relative h-64 w-full bg-gray-100">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />


        <button
          onClick={handleLikeClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg z-10 transition-all hover:scale-110"
        >
          {liked ? (
            <HeartFilled className="text-red-500 text-lg" />
          ) : (
            <HeartOutlined className="text-gray-600 text-lg" />
          )}
        </button>


        {product.category && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-white text-xs font-medium rounded shadow-sm z-10">
            {product.category}
          </span>
        )}


        <span className="absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
          -20%
        </span>
      </div>


      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>

        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}


        <div className="flex items-center mb-3">
          <Rate
            disabled
            defaultValue={product.rating}
            allowHalf
            className="text-sm text-yellow-500"
          />
          <span className="text-gray-500 text-sm ml-2">({product.rating})</span>
        </div>


        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>
          <Button
            type={isInCart ? 'default' : 'primary'}
            icon={<ShoppingCartOutlined />}
            onClick={handleCartClick}
            className={isInCart ? 'border-green-500 text-green-500' : 'bg-black hover:bg-gray-800'}
          >
            {isInCart ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard