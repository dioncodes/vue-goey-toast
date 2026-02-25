import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: [
			{
				find: 'vue-goey-toast/styles.css',
				replacement: resolve(repoRoot, 'src/styles.css')
			},
			{
				find: 'vue-goey-toast',
				replacement: resolve(repoRoot, 'src/index.ts')
			}
		]
	}
})
