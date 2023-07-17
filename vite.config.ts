import { defineConfig } from 'vite';
import reactRefresh from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({


  // Output directory for the production build
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
  },

  // Development server configuration
  server: {
    host: 'localhost',
    port: 3000, 
  },

  
  // Configure plugins
  plugins: [
    // Add any additional plugins you may need
    reactRefresh(),
    svgrPlugin({
        svgrOptions:{
            icon:true,
        },
    }),
  ],
});
