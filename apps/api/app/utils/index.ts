import router from '@adonisjs/core/services/router'

/**
 * Define a route group.
 * Basically better than `router.group()` because you don't need
 * to scroll to the bottom of the file to see what is the prefix
 */
export function defineRouteGroup(prefixOrCallback: string | (() => void), callback?: () => void) {
  if (typeof prefixOrCallback === 'function') {
    callback = prefixOrCallback
    prefixOrCallback = ''
  }

  const group = router.group(callback!)
  if (prefixOrCallback) group.prefix(prefixOrCallback)

  return group
}
