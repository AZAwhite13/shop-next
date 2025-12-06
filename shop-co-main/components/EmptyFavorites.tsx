'use client'

import { Button, Empty } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'

const EmptyFavorites = () => {
  return (
    <div className="text-center py-12">
      <Empty
        image={<HeartOutlined className="text-5xl text-gray-400" />}
        description={
          <div>
            <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items here to easily find them later.
              Click the heart icon on any product to add it to your favorites.
            </p>
          </div>
        }
      >
        <div className="space-x-4">
          <Link href="/">
            <Button type="primary" size="large" className="bg-black hover:bg-gray-800">
              Start Shopping
            </Button>
          </Link>
          <Link href="/products">
            <Button size="large">
              Browse Products
            </Button>
          </Link>
        </div>
      </Empty>
    </div>
  )
}

export default EmptyFavorites