import '@/styles/globals.css'
import '@/styles/aos.css'
import Providers from '@/providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import AosScript from '@/scripts/AosScript'

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'], })

let siteDescription = `Imperium Logistics`

export const metadata: Metadata = {
	title: 'Imperium Logistics',
	description: siteDescription,
	keywords: [
		"imperium", "imperium logistics", "logistics"
	],
	icons: '/favicon.ico',
	// openGraph:{
	// 	type: 'website',
	// 	url: 'https://www.routefindersconsulting.com',
	// 	title: "Route Finders",
	// 	description: siteDescription,
	// 	siteName: "Route Finders",
	// 	images:[
	// 		{ url: '/logo.png' },
	// 	],
	// },
	// twitter:{
	// 	title: "Route Finders",
	// 	description: siteDescription,
	// 	site: 'Route Finders',
	// 	images:[
	// 		{ url: '/logo.png' },
	// 	],
	// }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="/preline.js"/>
        <AosScript/>
        <Providers>
            { children }
        </Providers>
      </body>
    </html>
  )
}
