'use client'

import React from 'react'
import { Button, Empty, Row, Col, message } from 'antd'
import { 
  HeartFilled, 
  HeartOutlined, 
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { useFavorites } from '@/hooks/useFavorites'
import { useCart } from '@/hooks/useCart'

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites()
  const { addToCart } = useCart()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    })
    message.success(`${item.name} added to cart!`)
  }

  const handleRemoveFromFavorites = (id: string, name: string) => {
    removeFromFavorites(id)
    message.success(`${name} removed from favorites`)
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-gray-600 mb-6">
            <ArrowLeftOutlined className="mr-2" />
            Continue Shopping
          </Link>
          
          <div className="text-center py-12">
            <Empty
              image={<HeartOutlined className="text-5xl text-gray-400" />}
              description={
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                  <p className="text-gray-600 mb-8">
                    Save items you love to your wishlist. Review them anytime and easily move them to the bag.
                  </p>
                </div>
              }
            >
              <Link href="/">
                <Button type="primary" size="large" className="bg-black hover:bg-gray-800">
                  Start Shopping
                </Button>
              </Link>
            </Empty>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
       
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600">
            <ArrowLeftOutlined className="mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">MY WISHLIST</h1>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              {favorites.length} items
            </span>
          </div>
          <Button 
            type="text" 
            danger 
            onClick={clearFavorites}
            className="text-red-500 hover:text-red-600"
            icon={<DeleteOutlined />}
          >
            Clear All
          </Button>
        </div>

      
        <Row gutter={[24, 24]}>
          {favorites.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8} xl={6}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
               
                <div className="relative h-64 w-full bg-gray-100">
                  <img
                    src={item.image || 'https://i.ibb.co/9jSm21c/product1.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  
               
                  <button
                    onClick={() => handleRemoveFromFavorites(item.id, item.name)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg z-10 hover:scale-110 transition-all"
                  >
                    <HeartFilled className="!text-red-500 text-lg" />
                  </button>
                  
               
                  {item.category && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-white text-xs font-medium rounded shadow-sm z-10">
                      {item.category}
                    </span>
                  )}
                </div>
                
                
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{item.name}</h3>
                  
                
                  {item.rating && (
                    <div className="flex items-center mb-3">
                      <div className="text-yellow-500 text-sm">
                        {'★'.repeat(Math.floor(item.rating))}
                        {'☆'.repeat(5 - Math.floor(item.rating))}
                      </div>
                      <span className="text-gray-500 text-sm ml-2">({item.rating})</span>
                    </div>
                  )}
                  
                
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-black">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${(item.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                  
                 
                  <div className="flex space-x-2 mt-auto">
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-black hover:bg-gray-800"
                    >
                      Add to Cart
                    </Button>
                    
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveFromFavorites(item.id, item.name)}
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-bold mb-1">Wishlist Summary</h3>
              <p className="text-gray-600">
                You have {favorites.length} item{favorites.length !== 1 ? 's' : ''} in your wishlist
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                type="primary" 
                className="bg-black hover:bg-gray-800"
                onClick={() => {
                  favorites.forEach(item => handleAddToCart(item))
                  message.success('All items added to cart!')
                }}
              >
                <ShoppingCartOutlined className="mr-2" />
                Add All to Cart
              </Button>
              
              <Button 
                danger 
                onClick={clearFavorites}
              >
                <DeleteOutlined className="mr-2" />
                Clear Wishlist
              </Button>
            </div>
          </div>
        </div>
        
      
      </div>
    </div>
  )
}

export default FavoritesPage