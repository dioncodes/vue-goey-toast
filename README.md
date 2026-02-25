# vue-goey-toast

`vue-goey-toast` is now fully rebuilt for **Vue 3** using the **Composition API** with `<script setup lang="ts">`.

## Install

```bash
npm install vue-goey-toast vue
```

## Install from the forked GitHub branch

```bash
npm install github:dioncodes/vue-goey-toast#codex/migrate-library-to-vue-3-with-ts-support
```

Then import it as:

```ts
import { GoeyToaster, goeyToast } from 'vue-goey-toast'
import 'vue-goey-toast/styles.css'
```

## Usage

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'vue-goey-toast/styles.css'

createApp(App).mount('#app')
```

```vue
<template>
	<GoeyToaster position="bottom-right" />
	<button @click="notify">Show toast</button>
</template>

<script setup lang="ts">
import { GoeyToaster, goeyToast } from 'vue-goey-toast'

const notify = (): void => {
	goeyToast.success('Saved!', {
		description: 'Your profile was updated successfully.'
	})
}
</script>
```

## API

### `goeyToast`

- `goeyToast(title, options?)`
- `goeyToast.success(title, options?)`
- `goeyToast.error(title, options?)`
- `goeyToast.warning(title, options?)`
- `goeyToast.info(title, options?)`
- `goeyToast.loading(title, options?)`
- `goeyToast.promise(promise, data)`
- `goeyToast.dismiss(id?)`

### `<GoeyToaster />` props

- `position`: `top-left | top-center | top-right | bottom-left | bottom-center | bottom-right`
- `offset`: string (`24px` default)
- `gap`: string (`12px` default)
- `duration`: number (`4000` default)
- `maxToasts`: number (`5` default)

## TypeScript support

Types are bundled and exported for:

- `GoeyToastOptions`
- `GoeyToastAction`
- `GoeyToastItem`
- `GoeyPromiseData<T>`
- `GoeyToasterProps`

## License & origin

This project is MIT licensed.

This Vue package is based on the original work from the upstream project/fork origin:
- Original upstream: `anl331/goey-toast`
- Forked Vue package repo: `dioncodes/vue-goey-toast`
