import { Outfit, Merriweather } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const merriweather = Merriweather({ 
  subsets: ['latin'], 
  weight: ['700'],
  variable: '--font-merriweather' 
})

export const metadata = {
  title: 'Braz | Fale com um Especialista',
  description: 'Atendimento rápido e humano. Fale direto com nosso especialista pelo WhatsApp.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1b9d7d',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <script dangerouslySetInnerHTML={{__html: `
          (function(){
            try{
              var p=new URLSearchParams(window.location.search);
              var fc=p.get('fbclid');
              if(fc&&!document.cookie.match(/_fbc=/)){
                var v='fb.1.'+Date.now()+'.'+fc;
                document.cookie='_fbc='+v+';max-age=7776000;path=/;SameSite=Lax';
              }
            }catch(e){}
          })();
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('set','autoConfig',false,'1258132206414552');
          fbq('init','1258132206414552');
          fbq('track','PageView');
        `}} />
        <noscript>
          <img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1258132206414552&ev=PageView&noscript=1" alt="" />
        </noscript>
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
