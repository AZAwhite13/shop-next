'use client'

import React, { useState } from 'react'
import { Button, Input, Divider, Select, message, Empty } from 'antd'
import { 
  ArrowLeftOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  MinusOutlined,
  TagOutlined,
  ShoppingCartOutlined 
} from '@ant-design/icons'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

const { Option } = Select

const CartPage = () => {
  const [promoCode, setPromoCode] = useState('')
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  const subtotal = getTotalPrice()
  const discount = subtotal * 0.20 
  const deliveryFee = 15
  const total = subtotal - discount + deliveryFee

  const handleQuantityChange = (id: string, change: number) => {
    const item = cart.find(item => item.id === id)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity)
      } else {
        removeFromCart(id)
      }
    }
  }

  const handleApplyPromo = () => {
    if (promoCode === 'SHOP20') {
      message.success('Promo code applied! 20% discount activated.')
    } else if (promoCode) {
      message.error('Invalid promo code')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-gray-600 mb-6">
            <ArrowLeftOutlined className="mr-2" />
            Continue Shopping
          </Link>
          
          <div className="text-center py-12">
            <Empty
              image={<ShoppingCartOutlined className="text-5xl text-gray-400" />}
              description={
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                  <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
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
          <h1 className="text-3xl font-bold">YOUR CART</h1>
          <Button 
            type="text" 
            danger 
            onClick={clearCart}
            className="text-red-500 hover:text-red-600"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row border-b pb-6 last:border-0">
                   
                    <div className="relative w-full sm:w-32 h-32 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        src={item.image || 'https://i.ibb.co/9jSm21c/product1.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        <DeleteOutlined className="text-xs" />
                      </button>
                    </div>

                  
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                          <div className="space-y-1 text-gray-600 text-sm">
                            {item.size && <div>Size: <span className="font-medium">{item.size}</span></div>}
                            {item.color && <div>Color: <span className="font-medium">{item.color}</span></div>}
                            {item.category && <div>Category: <span className="font-medium">{item.category}</span></div>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>

                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <Select 
                            defaultValue={item.size || "Large"} 
                            className="w-24"
                            onChange={(value) => {
                              console.log('Size changed:', value)
                            }}
                          >
                            <Option value="Small">Small</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="Large">Large</Option>
                            <Option value="XL">XL</Option>
                          </Select>
                          <Select 
                            defaultValue={item.color || "White"} 
                            className="w-24"
                            onChange={(value) => {
                              console.log('Color changed:', value)
                            }}
                          >
                            <Option value="White">White</Option>
                            <Option value="Black">Black</Option>
                            <Option value="Red">Red</Option>
                            <Option value="Blue">Blue</Option>
                            <Option value="Green">Green</Option>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          >
                            <MinusOutlined />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          >
                            <PlusOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Add promo code</p>
                <div className="flex">
                  <Input
                    placeholder="Enter promo code"
                    prefix={<TagOutlined className="text-gray-400" />}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow rounded-l-lg"
                  />
                  <Button
                    type="primary"
                    onClick={handleApplyPromo}
                    className="bg-black hover:bg-gray-800 rounded-r-lg"
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try <span className="font-mono font-bold">SHOP20</span> for 20% discount
                </p>
              </div>

              <Divider className="my-4" />
ъ
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount (-20%)</span>
                  <span className="text-red-500 font-medium">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <Divider className="my-4" />

            
              <div className="flex justify-between text-lg font-bold mb-8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

             
              <Link href="/checkout">
                <Button
                  type="primary"
                  size="large"
                  className="w-full bg-black hover:bg-gray-800 h-12 text-lg"
                >
                  Go to Checkout →
                </Button>
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free shipping on orders over $100. 30-day return policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage