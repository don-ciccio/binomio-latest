/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            animation: {
                wiggle: "wiggle 200ms ease-in-out",
            },
            objectPosition: {
                "top-center": "top center",
                "center-center": "center center",
            },
            backgroundImage: {
                "down-arrow": "url('./images/arrowdown.svg')",
            },
            backgroundSize: {
                extra: "1rem 12px",
                small: "16px 12px",
            },
            backgroundPosition: {
                "center-075": "right 0.75rem center",
            },
            height: {
                sm: "3px",
                25: "100px",
                inherit: "inherit",
                30: "120px",
                13: "52px",
            },
            maxWidth: {
                "1/3": "33.33333%",
                "5/12": "41.66667%",
                "7/12": "66.66667%",
                "2/12": "16.66667%",
                "3/4": "75%",
                "4/5": "80%",
                "1/4": "25%",
                "1/2": "50%",
                89: "89%",
                230: "230px",
                400: "400px",
                "58%": "58.3333%",
            },
            minWidth: {
                50: "50px",
                225: "225px",
                295: "295px",
            },
            flex: {
                0: "0 0 auto",
                1: "1 1 0%",
                auto: "1 1 auto",
                initial: "0 1 auto",
                inherit: "inherit",
                none: "none",
                2: "2 2 0%",
                "basis-100%": "0 0 100%",
                "basis-525": "0 0 525px",
                "basis-140": "0 0 140px",
                "basis-100": "0 0 100px",
                "basis-52": "0 0 52px",
                "basis-50": "0 0 50%",
                "basis-33": "0 0 33.33333%",
                "basis-41": "0 0  41.6667%",
                "basis-16": "0 0 16.66667%",
                "basis-25": "0 0 25%",
                "basis-20": "0 0 20%",
                "basis-89": "0 0 89%",
                "basis-58": "0 0 58.3333%",
                "basis-80": "0 0 80%",
                "basis-11": "0 0 11%",
                "basis-66": "0 0 66.66667%",
                "basis-1": "1 1 1px",
            },
            spacing: {
                72: "18rem",
                84: "21rem",
                98: "28.125rem",
                100: "32rem",
            },
            borderWidth: {
                9: "9px",
                15: "15px",
            },
            width: {
                "1%": "1%",
                "fit-content": "fit-content",
                13: "52px",
                inherit: "inherit",
                140: "140%",
            },
            zIndex: {
                1: "1",
                2: "2",
                15: "15",
                "-1": "-1",
                "-5": "-5",
                25: "25",
            },
            transitionProperty: {
                width: "width",
            },
            colors: {
                gray: {
                    150: "#f1f1f1",
                },
            },
        },
        screens: {
            xsMax: { max: "767px" },
            xxs: "320px",
            xs: "425px",
            sm: "620px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "991px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [],
};
