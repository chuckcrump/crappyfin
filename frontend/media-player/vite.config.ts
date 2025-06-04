import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/cf-media-player.ts",
      formats: ["es"],
      fileName: "cfMediaPlayer",
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
