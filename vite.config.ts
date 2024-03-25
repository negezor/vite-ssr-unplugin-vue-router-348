import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import { getFileBasedRouteName } from 'unplugin-vue-router'
import vueRouter from 'unplugin-vue-router/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueRouter({
      dts: './src/typed-router.d.ts',
      logs: true,
      getRouteName: (node) => {
        let routeName = getFileBasedRouteName(node).substring(1);

        if (routeName === '') {
          return 'index';
        }

        if (routeName.at(-1) === '/') {
          routeName = routeName.substring(0, routeName.length - 1);
        }

        if (node.children.size !== 0) {
          routeName += '-root';
        }

        return routeName
          .replace(/\[|\]/g, '')
          .replace(/\//g, '-');
      },
      routesFolder: {
        src: 'src',
        filePatterns: 'pages/**/*',
        path: (file) => {
          const sourceDir = file.substring(file.lastIndexOf('src/') + 5);

          return sourceDir.substring(sourceDir.indexOf('pages') + 6);
        },
      }
    }),
    vue()
  ]
})
