import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Harshima_Singla_Portfolio/',
  plugins: [react()],
})


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig(({ command }) => ({
//   // when you run `vite` (dev), base === "/"
//   // when you run `vite build`, base === "/Harshima_Singla_Portfolio/"
//   base:
//     command === "serve"
//       ? "/"
//       : "/Harshima_Singla_Portfolio/",
//   plugins: [react()],
// }));
