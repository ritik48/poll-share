/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: "Lato, Monospace",
		},
		extend: {
			colors: {
				"primary":"#feefd0"
			}
		},
	},
	plugins: [],
};
