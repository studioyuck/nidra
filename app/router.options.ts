import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  routes: (_routes) => {
    const result: typeof _routes = []

    for (const route of _routes) {
      if (route.path === '/product' && route.children?.length) {
        // Drop the parent wrapper — add /product itself as a standalone stub
        result.push({ ...route, children: undefined })
        // Hoist each child to the top level with its full absolute path
        for (const child of route.children) {
          result.push({
            ...child,
            path: `/product/${child.path}`,
          })
        }
      } else {
        result.push(route)
      }
    }

    return result
  },
}
