import { Outfit, Merriweather } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const merriweather = Merriweather({ 
  subsets: ['latin'], 
  weight: ['700'],
  variable: '--font-merriweather' 
})

export const metadata = {
  title: 'Empréstimo Imediato | Braz Empréstimos',
  description: 'Crédito rápido e humano para quem precisa resolver as contas agora.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2149ff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
