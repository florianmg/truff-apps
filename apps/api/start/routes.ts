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

defineRouteGroup('clients', () => {
  router.get('/', [controllers.Clients, 'index'])
  router.post('/', [controllers.Clients, 'store'])
  router.get('/:clientId', [controllers.Clients, 'show'])
  router.delete('/:clientId', [controllers.Clients, 'destroy'])
}).use(middleware.auth())

defineRouteGroup('animals', () => {
  router.get('/', [controllers.Animals, 'index'])
  router.post('/', [controllers.Animals, 'store'])
  router.get('/:animalId', [controllers.Animals, 'show'])
  router.delete('/:animalId', [controllers.Animals, 'destroy'])
}).use(middleware.auth())

defineRouteGroup('contacts', () => {
  router.get('/', [controllers.Contacts, 'index'])
  router.post('/', [controllers.Contacts, 'store'])
  router.get('/:contactId', [controllers.Contacts, 'show'])
  router.delete('/:contactId', [controllers.Contacts, 'destroy'])
}).use(middleware.auth())

router.get('/is-authenticated', [controllers.Auth, 'isAuthenticated'])
router.get('health', [controllers.HealthChecks, 'handle']).use(middleware.requireSecretToken())
