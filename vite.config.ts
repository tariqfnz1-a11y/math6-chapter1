import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }

          // Exclude the large source textbook PDF from the published dist/ output
          // while keeping the original file intact under public/assets/aistudio/.
          const distAiStudioDir = path.resolve(distDir, 'assets/aistudio');
          if (fs.existsSync(distAiStudioDir)) {
            fs.rmSync(distAiStudioDir, {recursive: true, force: true});
          }
          const removePdfFiles = (dir: string): void => {
            if (!fs.existsSync(dir)) return;
            for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
              const fullPath = path.join(dir, entry.name);
              if (entry.isDirectory()) {
                removePdfFiles(fullPath);
              } else if (entry.isFile() && /\.pdf$/i.test(entry.name)) {
                fs.rmSync(fullPath, {force: true});
              }
            }
          };
          removePdfFiles(distDir);

          // Prevent GitHub Pages Jekyll processing on static output
          if (fs.existsSync(distDir)) {
            fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
          }

          // Inject built hashed JS/CSS bundles into dist/sw.js so first online visit
          // immediately precaches the entire offline application shell.
          const swPath = path.resolve(distDir, 'sw.js');
          const builtAssetsDir = path.resolve(distDir, 'assets');
          if (fs.existsSync(swPath) && fs.existsSync(builtAssetsDir)) {
            const builtFiles = fs
              .readdirSync(builtAssetsDir, {withFileTypes: true})
              .filter((entry) => entry.isFile() && /\.(js|css|woff2?|png|svg)$/i.test(entry.name))
              .map((entry) => `./assets/${entry.name}`);
            if (builtFiles.length > 0) {
              const swContent = fs.readFileSync(swPath, 'utf8');
              const baseUrls = [
                './',
                './index.html',
                './manifest.webmanifest',
                './icon.svg',
                './pwa-192x192.png',
                './pwa-512x512.png',
                './pwa-maskable-512x512.png',
                './apple-touch-icon.png',
                ...builtFiles,
              ];
              const updatedSw = swContent.replace(
                /const PRECACHE_URLS = \[[\s\S]*?\];/,
                `const PRECACHE_URLS = ${JSON.stringify(baseUrls, null, 2)};`
              );
              fs.writeFileSync(swPath, updatedSw, 'utf8');
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
