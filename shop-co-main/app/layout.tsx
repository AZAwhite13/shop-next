import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={{
            token: {
              colorPrimary: '#000000',
              borderRadius: 6,
            },
          }}>
            <Header />            
            <main className="min-h-screen">
              {children}
            </main>
       
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}