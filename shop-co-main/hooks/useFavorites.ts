'use client'

import { useState, useEffect } from 'react'

export interface FavoriteItem {
  id: string
  name: string
  price: number
  image?: string
  category?: string
  rating?: number
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    const savedFavorites = localStorage.getItem('shop-co-favorites')
    console.log('Loading favorites from localStorage:', savedFavorites)
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        console.log('Parsed favorites:', parsed)
        setFavorites(parsed)
      } catch (error) {
        console.error('Error parsing favorites:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      console.log('Saving favorites to localStorage:', favorites)
      localStorage.setItem('shop-co-favorites', JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addToFavorites = (item: FavoriteItem) => {
    console.log('Adding to favorites:', item)
    setFavorites(prev => {
      const existingItem = prev.find(fav => fav.id === item.id)
      
      if (existingItem) {
        console.log('Item already in favorites')
        return prev
      }
      
      const newFavorites = [...prev, item]
      console.log('Updated favorites:', newFavorites)
      return newFavorites
    })
  }

  const removeFromFavorites = (id: string) => {
    console.log('Removing from favorites:', id)
    setFavorites(prev => prev.filter(item => item.id !== id))
  }
  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id)
  }

  const clearFavorites = () => {
    console.log('Clearing all favorites')
    setFavorites([])
  }

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id)
    } else {
      addToFavorites(item)
    }
  }


  const getFavoritesCount = () => {
    return favorites.length
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    getFavoritesCount,
    isLoaded
  }
}