# Solana NFT Minting Site
Solana NFT Mint. 

## Setup and run
```sh
yarn
yarn dev
```

Open [http://localhost:5173/](http://localhost:5173/) to see the app.

It's configured to use polling for hot reload to make it work with WSL. You can undo this by removing the `server.watch.usePolling` option from `vite.config.ts`:

```diff
// vite.config.ts
export default defineConfig({
  plugins: [react()],
-  server: {
-    watch: {
-     usePolling: true,
-    },
-  },
})
```

This will make hot reloads faster but they won't work on WSL.

## Adding a component

Create a new file in the `src/components` directory and add the following code:

```tsx
import { FC, useState } from 'react'

const Counter: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

export default Counter
```
