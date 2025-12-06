'use client'

import { SearchOutlined, ShoppingCartOutlined, UserOutlined, HeartOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Input, Badge, Drawer } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { getTotalItems } = useCart()
  const { getFavoritesCount } = useFavorites()

  const navItems = [
    { label: 'Shop', href: '/' },
    { label: 'On Sale', href: '#' },
    { label: 'New Arrivals', href: '#' },
    { label: 'Brands', href: '#' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold">
              SHOP<span className="text-gray-500">.CO</span>
            </Link>

            
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

         
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <Input
                placeholder="Search for products..."
                prefix={<SearchOutlined className="text-gray-400" />}
                className="rounded-full"
              />
            </div>

          
            <div className="flex items-center space-x-4">
              <button className="md:hidden" onClick={() => setDrawerVisible(true)}>
                <MenuOutlined className="text-xl" />
              </button>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/favorites">
                  <Badge count={getFavoritesCount()} size="small">
                    <HeartOutlined className="text-xl cursor-pointer hover:text-red-500" />
                  </Badge>
                </Link>
                
                <Link href="/cart">
                  <Badge count={getTotalItems()} size="small">
                    <ShoppingCartOutlined className="text-xl cursor-pointer hover:text-primary" />
                  </Badge>
                </Link>
                
                <UserOutlined className="text-xl cursor-pointer hover:text-primary" />
              </div>
              
             
              <Link href="/favorites" className="md:hidden">
                <Badge count={getFavoritesCount()} size="small">
                  <HeartOutlined className="text-xl cursor-pointer hover:text-red-500" />
                </Badge>
              </Link>
              
              <Link href="/cart" className="md:hidden">
                <Badge count={getTotalItems()} size="small">
                  <ShoppingCartOutlined className="text-xl cursor-pointer hover:text-primary" />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </header>

      
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-lg py-2 border-b"
              onClick={() => setDrawerVisible(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              className="mb-4"
            />
            <div className="flex space-x-4">
              <Link href="/favorites" onClick={() => setDrawerVisible(false)}>
                <Badge count={getFavoritesCount()}>
                  <Button icon={<HeartOutlined />} type="text" />
                </Badge>
              </Link>
              <Link href="/cart" onClick={() => setDrawerVisible(false)}>
                <Badge count={getTotalItems()}>
                  <Button icon={<ShoppingCartOutlined />} type="text" />
                </Badge>
              </Link>
              <Button icon={<UserOutlined />} type="text" />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Header