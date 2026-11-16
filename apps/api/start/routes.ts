import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import { defineRouteGroup } from '#utils/index'

defineRouteGroup(() => {
  router.post('register', [controllers.Auth, 'register'])
  router.post('login', [controllers.Auth, 'login'])
}).use(middleware.guest())

defineRouteGroup(() => {
  router.post('logout', [controllers.Auth, 'logout'])
  router.get('me', [controllers.Auth, 'getMe'])
}).use(middleware.auth())

router.get('/is-authenticated', [controllers.Auth, 'isAuthenticated'])
router.get('health', [controllers.HealthChecks, 'handle']).use(middleware.requireSecretToken())
