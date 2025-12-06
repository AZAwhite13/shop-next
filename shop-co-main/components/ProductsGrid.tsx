'use client'

import { useEffect, useState } from 'react'
import { Row, Col, Spin, Alert, Tabs, Button } from 'antd'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  price: number
  rating: number
  image?: string
  category?: string
  description?: string
}

const ProductsGrid = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://68b03acd3b8db1ae9c033d61.mockapi.io/manager')

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      console.log('Products from API:', data)


      const ids = data.map((p: Product) => p.id)
      const uniqueIds = [...new Set(ids)]

      if (ids.length !== uniqueIds.length) {
        console.warn('API возвращает товары с одинаковыми ID!')
        const productsWithUniqueIds = data.map((product: Product, index: number) => ({
          ...product,
          id: `${product.id}-${index}`
        }))
        setProducts(productsWithUniqueIds)
      } else {
        setProducts(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={fetchProducts}>
            Retry
          </Button>
        }
      />
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">NEW ARRIVALS</h2>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { label: 'All Products', key: 'all' },
              { label: 'Casual', key: 'casual' },
              { label: 'Party', key: 'party' },
              { label: 'Formal', key: 'formal' },
              { label: 'Gym', key: 'gym' },
            ]}
          />
        </div>

        <Row gutter={[24, 24]}>
          {products.map((product, index) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              lg={8}
              xl={6}
            >
              <ProductCard
                product={product}
                imageIndex={index}
              />
            </Col>
          ))}
        </Row>

        <div className="text-center mt-12">
          <Button
            type="primary"
            size="large"
            className="bg-black hover:bg-gray-800 px-12 h-12"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProductsGrid