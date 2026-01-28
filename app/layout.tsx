import type { Metadata, Viewport } from 'next'
import './globals.css'
import FilmGrain from '@/components/effects/FilmGrain'

export const metadata: Metadata = {
    title: 'Renai - Realise Your Creative Ideas',
    description: 'Renai is a digital production studio specializing in 3D visual storytelling and interactive web experiences.',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
                <FilmGrain />
            </body>
        </html>
    )
}
