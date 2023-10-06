// vite.config.ts
import { crx } from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.19/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/@vitejs+plugin-vue@4.4.0_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { dirname, relative } from "path";
import AutoImport from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.1/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/unplugin-icons@0.17.0_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/unplugin-icons@0.17.0_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/vite.mjs";
import Components from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/vite@4.4.9_@types+node@18.18.3_sass@1.68.0/node_modules/vite/dist/node/index.js";
import Pages from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/vite-plugin-pages@0.31.0_@vue+compiler-sfc@3.3.4_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///C:/Users/Admin/Desktop/ea-trader/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.19/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  dependencies: {
    vue: "^3.3.4",
    "vue-router": "^4.2.5"
  },
  description: "A Vue 3 + Vite project for building Chrome extensions",
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.19",
    "@iconify-json/mdi": "^1.1.54",
    "@tailwindcss/forms": "^0.5.6",
    "@tailwindcss/typography": "^0.5.10",
    "@types/chrome": "^0.0.246",
    "@types/eslint": "^8.44.3",
    "@types/eslint-config-prettier": "^6.11.1",
    "@types/node": "^18.18.3",
    "@typescript-eslint/eslint-plugin": "^6.7.4",
    "@typescript-eslint/parser": "^6.7.4",
    "@vitejs/plugin-vue": "^4.4.0",
    "@vue/compiler-sfc": "^3.3.4",
    "@vueuse/core": "^10.4.1",
    autoprefixer: "^10.4.16",
    daisyui: "^3.8.3",
    eslint: "^8.50.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-vue": "^9.17.0",
    postcss: "^8.4.31",
    prettier: "^3.0.3",
    "prettier-plugin-tailwindcss": "^0.5.4",
    sass: "^1.68.0",
    tailwindcss: "^3.3.3",
    typescript: "^5.2.2",
    "unplugin-auto-import": "^0.16.6",
    "unplugin-icons": "^0.17.0",
    "unplugin-vue-components": "^0.25.2",
    vite: "^4.4.9",
    "vite-plugin-pages": "^0.31.0",
    "vue-tsc": "^1.8.15",
    "webext-bridge": "^6.0.1"
  },
  displayName: "Vite Vue 3 Chrome Extension",
  name: "vite-vue3-chrome-extension-v3",
  overrides: {
    "@crxjs/vite-plugin": "$@crxjs/vite-plugin"
  },
  pnpm: {
    overrides: {},
    peerDependencyRules: {
      allowAny: [],
      allowedDeprecatedVersions: {
        "sourcemap-codec": "1.4.8"
      },
      allowedVersions: {},
      ignoreMissing: []
    }
  },
  private: true,
  scripts: {
    build: "vite build",
    dev: "vite",
    lint: "eslint . --fix --ext js,mjs,cjs,ts,mts,cts,vue",
    preview: "vite preview"
  },
  type: "module",
  version: "0.0.1"
};

// manifest.config.ts
var { version, name, description, displayName } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async (env) => ({
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_popup: "src/popup/index.html"
  },
  background: {
    service_worker: "src/background/index.ts"
  },
  content_scripts: [
    {
      all_frames: false,
      js: ["src/content-script/index.ts"],
      matches: ["*://*/*"],
      run_at: "document_end"
    }
  ],
  host_permissions: ["*://*/*"],
  options_page: "src/options/index.html",
  permissions: ["storage", "activeTab", "identity"],
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/index.ts"]
    },
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/iframe/index.html"]
    }
  ]
}));

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///C:/Users/Admin/Desktop/ea-trader/vite.config.ts";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "~": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      src: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [
    crx({ manifest: manifest_config_default }),
    vue(),
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: ""
        },
        {
          dir: "src/options/pages",
          baseRoute: "options"
        },
        {
          dir: "src/popup/pages",
          baseRoute: "popup"
        },
        {
          dir: "src/content-script/iframe/pages",
          baseRoute: "iframe"
        }
      ]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vue/macros", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables/"]
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: "i",
          enabledCollections: ["mdi"]
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: "vue3",
      scale: 1.5
    }),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        iframe: "src/content-script/iframe/index.html"
      }
    }
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false
    }
  },
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
    exclude: ["vue-demi"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXERlc2t0b3BcXFxcZWEtdHJhZGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEZXNrdG9wXFxcXGVhLXRyYWRlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW4vRGVza3RvcC9lYS10cmFkZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IGRpcm5hbWUsIHJlbGF0aXZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5jb25maWcnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ34nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICBzcmM6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgY3J4KHsgbWFuaWZlc3QgfSksXG5cbiAgICB2dWUoKSxcblxuICAgIFBhZ2VzKHtcbiAgICAgIGRpcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRpcjogJ3NyYy9wYWdlcycsXG4gICAgICAgICAgYmFzZVJvdXRlOiAnJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpcjogJ3NyYy9vcHRpb25zL3BhZ2VzJyxcbiAgICAgICAgICBiYXNlUm91dGU6ICdvcHRpb25zJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpcjogJ3NyYy9wb3B1cC9wYWdlcycsXG4gICAgICAgICAgYmFzZVJvdXRlOiAncG9wdXAnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9wYWdlcycsXG4gICAgICAgICAgYmFzZVJvdXRlOiAnaWZyYW1lJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVlL21hY3JvcycsICdAdnVldXNlL2NvcmUnXSxcbiAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcy8nXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgIENvbXBvbmVudHMoe1xuICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cyddLFxuICAgICAgLy8gZ2VuZXJhdGUgYGNvbXBvbmVudHMuZC50c2AgZm9yIHRzIHN1cHBvcnQgd2l0aCBWb2xhclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgLy8gYXV0byBpbXBvcnQgaWNvbnNcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgcHJlZml4OiAnaScsXG4gICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ21kaSddLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4taWNvbnNcbiAgICBJY29ucyh7XG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICAgIGNvbXBpbGVyOiAndnVlMycsXG4gICAgICBzY2FsZTogMS41LFxuICAgIH0pLFxuXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcbiAgICB7XG4gICAgICBuYW1lOiAnYXNzZXRzLXJld3JpdGUnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCwgeyBwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcbiAgICAgICAgICAvXCJcXC9hc3NldHNcXC8vZyxcbiAgICAgICAgICBgXCIke3JlbGF0aXZlKGRpcm5hbWUocGF0aCksICcvYXNzZXRzJyl9L2BcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGlmcmFtZTogJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDg4ODgsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBobXI6IHtcbiAgICAgIHBvcnQ6IDg4ODksXG4gICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3Z1ZScsICdAdnVldXNlL2NvcmUnXSxcbiAgICBleGNsdWRlOiBbJ3Z1ZS1kZW1pJ10sXG4gIH0sXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEZXNrdG9wXFxcXGVhLXRyYWRlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcRGVza3RvcFxcXFxlYS10cmFkZXJcXFxcbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BZG1pbi9EZXNrdG9wL2VhLXRyYWRlci9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuY29uc3QgeyB2ZXJzaW9uLCBuYW1lLCBkZXNjcmlwdGlvbiwgZGlzcGxheU5hbWUgfSA9IHBhY2thZ2VKc29uXG4vLyBDb252ZXJ0IGZyb20gU2VtdmVyIChleGFtcGxlOiAwLjEuMC1iZXRhNilcbmNvbnN0IFttYWpvciwgbWlub3IsIHBhdGNoLCBsYWJlbCA9ICcwJ10gPSB2ZXJzaW9uXG4gIC8vIGNhbiBvbmx5IGNvbnRhaW4gZGlnaXRzLCBkb3RzLCBvciBkYXNoXG4gIC5yZXBsYWNlKC9bXlxcZC4tXSsvZywgJycpXG4gIC8vIHNwbGl0IGludG8gdmVyc2lvbiBwYXJ0c1xuICAuc3BsaXQoL1suLV0vKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChhc3luYyAoZW52KSA9PiAoe1xuICBuYW1lOiBlbnYubW9kZSA9PT0gJ3N0YWdpbmcnID8gYFtJTlRFUk5BTF0gJHtuYW1lfWAgOiBkaXNwbGF5TmFtZSB8fCBuYW1lLFxuICBkZXNjcmlwdGlvbixcbiAgLy8gdXAgdG8gZm91ciBudW1iZXJzIHNlcGFyYXRlZCBieSBkb3RzXG4gIHZlcnNpb246IGAke21ham9yfS4ke21pbm9yfS4ke3BhdGNofS4ke2xhYmVsfWAsXG4gIC8vIHNlbXZlciBpcyBPSyBpbiBcInZlcnNpb25fbmFtZVwiXG4gIHZlcnNpb25fbmFtZTogdmVyc2lvbixcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgLy8ga2V5OiAnZWtnbWNicGdnbGZsbWdjZmFqbmdscGJjYmRjY25uamUnLFxuICBhY3Rpb246IHtcbiAgICBkZWZhdWx0X3BvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxuICB9LFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIGFsbF9mcmFtZXM6IGZhbHNlLFxuICAgICAganM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXG4gICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcbiAgICAgIHJ1bl9hdDogJ2RvY3VtZW50X2VuZCcsXG4gICAgfSxcbiAgXSxcbiAgaG9zdF9wZXJtaXNzaW9uczogWycqOi8vKi8qJ10sXG4gIG9wdGlvbnNfcGFnZTogJ3NyYy9vcHRpb25zL2luZGV4Lmh0bWwnLFxuICBwZXJtaXNzaW9uczogWydzdG9yYWdlJywgJ2FjdGl2ZVRhYicsICdpZGVudGl0eSddLFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcbiAgICAgIHJlc291cmNlczogWydzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHMnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxuICAgICAgcmVzb3VyY2VzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCddLFxuICAgIH0sXG4gIF0sXG59KSlcbiIsICJ7XG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInZ1ZVwiOiBcIl4zLjMuNFwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjIuNVwiXG4gIH0sXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIFZ1ZSAzICsgVml0ZSBwcm9qZWN0IGZvciBidWlsZGluZyBDaHJvbWUgZXh0ZW5zaW9uc1wiLFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4xOVwiLFxuICAgIFwiQGljb25pZnktanNvbi9tZGlcIjogXCJeMS4xLjU0XCIsXG4gICAgXCJAdGFpbHdpbmRjc3MvZm9ybXNcIjogXCJeMC41LjZcIixcbiAgICBcIkB0YWlsd2luZGNzcy90eXBvZ3JhcGh5XCI6IFwiXjAuNS4xMFwiLFxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjQ2XCIsXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiXjguNDQuM1wiLFxuICAgIFwiQHR5cGVzL2VzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeNi4xMS4xXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xOC4zXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl42LjcuNFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjcuNFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuNC4wXCIsXG4gICAgXCJAdnVlL2NvbXBpbGVyLXNmY1wiOiBcIl4zLjMuNFwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjQuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTZcIixcbiAgICBcImRhaXN5dWlcIjogXCJeMy44LjNcIixcbiAgICBcImVzbGludFwiOiBcIl44LjUwLjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4wLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMTcuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzFcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4zXCIsXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC41LjRcIixcbiAgICBcInNhc3NcIjogXCJeMS42OC4wXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjMuM1wiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjIuMlwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNi42XCIsXG4gICAgXCJ1bnBsdWdpbi1pY29uc1wiOiBcIl4wLjE3LjBcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjUuMlwiLFxuICAgIFwidml0ZVwiOiBcIl40LjQuOVwiLFxuICAgIFwidml0ZS1wbHVnaW4tcGFnZXNcIjogXCJeMC4zMS4wXCIsXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjEuOC4xNVwiLFxuICAgIFwid2ViZXh0LWJyaWRnZVwiOiBcIl42LjAuMVwiXG4gIH0sXG4gIFwiZGlzcGxheU5hbWVcIjogXCJWaXRlIFZ1ZSAzIENocm9tZSBFeHRlbnNpb25cIixcbiAgXCJuYW1lXCI6IFwidml0ZS12dWUzLWNocm9tZS1leHRlbnNpb24tdjNcIixcbiAgXCJvdmVycmlkZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiJEBjcnhqcy92aXRlLXBsdWdpblwiXG4gIH0sXG4gIFwicG5wbVwiOiB7XG4gICAgXCJvdmVycmlkZXNcIjoge30sXG4gICAgXCJwZWVyRGVwZW5kZW5jeVJ1bGVzXCI6IHtcbiAgICAgIFwiYWxsb3dBbnlcIjogW10sXG4gICAgICBcImFsbG93ZWREZXByZWNhdGVkVmVyc2lvbnNcIjoge1xuICAgICAgICBcInNvdXJjZW1hcC1jb2RlY1wiOiBcIjEuNC44XCJcbiAgICAgIH0sXG4gICAgICBcImFsbG93ZWRWZXJzaW9uc1wiOiB7fSxcbiAgICAgIFwiaWdub3JlTWlzc2luZ1wiOiBbXVxuICAgIH1cbiAgfSxcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWZpeCAtLWV4dCBqcyxtanMsY2pzLHRzLG10cyxjdHMsdnVlXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCJcbiAgfSxcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCJcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFIsU0FBUyxXQUFXO0FBQ2hULE9BQU8sU0FBUztBQUNoQixTQUFTLFNBQVMsZ0JBQWdCO0FBQ2xDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLEtBQUsscUJBQXFCO0FBQ25DLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVzs7O0FDVGtSLFNBQVMsc0JBQXNCOzs7QUNBblU7QUFBQSxFQUNFLGNBQWdCO0FBQUEsSUFDZCxLQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsRUFD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
