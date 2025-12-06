'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Card, Row, Col, Radio, Divider, Select, message } from 'antd'
import { 
  ArrowLeftOutlined, 
  CreditCardOutlined, 
  CheckCircleOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

const { Option } = Select

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [form] = Form.useForm()
  const { cart, getTotalPrice, clearCart } = useCart()

  const subtotal = getTotalPrice()
  const discount = subtotal * 0.20
  const shipping = 15
  const tax = subtotal * 0.10
  const total = subtotal - discount + shipping + tax

  const handleSubmit = (values: any) => {
    console.log('Order submitted:', values)
    message.success('Order placed successfully!')
    clearCart()
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-gray-600 mb-6">
            <ArrowLeftOutlined className="mr-2" />
            Back to Shopping
          </Link>
          
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto">
              <ShoppingCartOutlined className="text-5xl text-gray-400 mb-4" />
              <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add items to your cart before checkout.</p>
              <Link href="/">
                <Button type="primary" className="bg-black hover:bg-gray-800">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/cart" className="inline-flex items-center text-gray-600 mb-6">
          <ArrowLeftOutlined className="mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Shipping Information" className="mb-6">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                      <Input placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                      <Input placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please enter your address' }]}
                >
                  <Input placeholder="123 Main Street" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="city"
                      label="City"
                      rules={[{ required: true, message: 'Please enter your city' }]}
                    >
                      <Input placeholder="New York" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="state"
                      label="State"
                      rules={[{ required: true, message: 'Please enter your state' }]}
                    >
                      <Input placeholder="NY" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="zipCode"
                      label="ZIP Code"
                      rules={[{ required: true, message: 'Please enter your ZIP code' }]}
                    >
                      <Input placeholder="10001" />
                    </FormItem>
                  </Col>
                </Row>

                <Divider />

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <Radio.Group
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full"
                  >
                    <div className="flex flex-col space-y-4">
                      <Radio value="credit" className="items-start">
                        <div className="ml-2">
                          <div className="flex items-center">
                            <CreditCardOutlined className="mr-2" />
                            <span>Credit Card</span>
                          </div>
                          {paymentMethod === 'credit' && (
                            <div className="mt-4">
                              <Row gutter={16}>
                                <Col span={24}>
                                  <Form.Item
                                    name="cardNumber"
                                    label="Card Number"
                                    rules={[{ required: true, message: 'Please enter card number' }]}
                                  >
                                    <Input placeholder="1234 5678 9012 3456" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    name="expiry"
                                    label="Expiry Date"
                                    rules={[{ required: true, message: 'Please enter expiry date' }]}
                                  >
                                    <Input placeholder="MM/YY" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    name="cvv"
                                    label="CVV"
                                    rules={[{ required: true, message: 'Please enter CVV' }]}
                                  >
                                    <Input placeholder="123" />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                      </Radio>
                      
                      <Radio value="paypal">
                        <div className="flex items-center ml-2">
                          <DollarOutlined className="mr-2" />
                          <span>PayPal</span>
                        </div>
                      </Radio>
                      
                      <Radio value="cash">
                        <div className="flex items-center ml-2">
                          <SafetyOutlined className="mr-2" />
                          <span>Cash on Delivery</span>
                        </div>
                      </Radio>
                    </div>
                  </Radio.Group>
                </div>

                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large"
                  className="w-full bg-black h-12"
                  icon={<CheckCircleOutlined />}
                >
                  Place Order (${total.toFixed(2)})
                </Button>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Order Summary">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount (20%)</span>
                    <span className="text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Divider />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-600 mb-2">
                    <CheckCircleOutlined className="mr-2" />
                    <span className="font-semibold">Free Return</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Free 30-day return policy. No questions asked.
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CheckoutPage