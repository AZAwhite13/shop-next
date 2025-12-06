'use client'

import { FC } from 'react'
import { InstagramOutlined, TwitterOutlined, FacebookOutlined, YoutubeOutlined } from '@ant-design/icons'

const Footer: FC = () => {
  const footerLinks = {
    shop: [
      { name: 'All Products', href: '#' },
      { name: 'New Arrivals', href: '#' },
      { name: 'Best Sellers', href: '#' },
      { name: 'Sale', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    help: [
      { name: 'Customer Support', href: '#' },
      { name: 'Delivery Details', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
    faq: [
      { name: 'Account', href: '#' },
      { name: 'Manage Deliveries', href: '#' },
      { name: 'Orders', href: '#' },
      { name: 'Payments', href: '#' },
    ],
    resources: [
      { name: 'Free eBooks', href: '#' },
      { name: 'Development Tutorial', href: '#' },
      { name: 'How-to Blog', href: '#' },
      { name: 'YouTube Playlist', href: '#' },
    ]
  }

  const socialLinks = [
    { icon: <InstagramOutlined />, href: '#' },
    { icon: <TwitterOutlined />, href: '#' },
    { icon: <FacebookOutlined />, href: '#' },
    { icon: <YoutubeOutlined />, href: '#' },
  ]

  return (
    <footer className=" text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
        
          <div className="lg:col-span-2">
            <h2 className="text-3xl text-black font-bold mb-4">SHOP.CO</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              When we are here, the little you enjoy will offer your passion to become fun, 
              someone loves fashion and style.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label="Social media"
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

        
          <div>
            <h3 className="font-bold text-black text-lg mb-4">SHOP</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-black text-lg mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-black text-lg mb-4">HELP</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

         
          <div>
            <h3 className="font-bold text-black text-lg mb-4">FAQ</h3>
            <ul className="space-y-2">
              {footerLinks.faq.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-black text-lg mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="border-t border-gray-400 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Shop.CO © 2024. All rights reserved.
            </p>
            <div className="flex gap-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" 
                alt="Visa" 
                className="h-8 w-auto"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                alt="Mastercard" 
                className="h-8 w-auto"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                alt="PayPal" 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer