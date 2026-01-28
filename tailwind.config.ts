import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'off-white': '#f0f1fa',
                'dark-white': '#e4e6ef',
                'grey-blue': '#2b2e3a',
                'dark-blue': '#071bdf',
                'header-color': '#0016ec',
                'green': '#c1ff00',
                'blue': '#1a2ffb',
                'red': '#ff4c41',
                'purple': '#8832f7',
            },
            fontFamily: {
                'aeonik': ['Aeonik', 'sans-serif'],
                'ibm-mono': ['IBMPlexMono', 'monospace'],
            },
            borderRadius: {
                'global': '20px',
            },
            spacing: {
                'base-x': 'max(5vw, 40px)',
                'base-y': 'clamp(30px, 4vw, 50px)',
            },
            fontSize: {
                'base': 'clamp(1rem, 1.5vw, 2rem)',
                'lg': '1.75em',
                '4xl': 'clamp(7em, 8vw, 20em)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'rotate': 'rotate 20s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
