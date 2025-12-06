'use client'

import { useState, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  size?: string
  color?: string
  category?: string
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    const savedCart = localStorage.getItem('shop-co-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

 
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('shop-co-cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

 
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }


  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }


  const clearCart = () => {
    setCart([])
  }

 
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }


  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isLoaded
  }
}