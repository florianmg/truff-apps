/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.get_me': {
    methods: ["GET","HEAD"],
    pattern: '/me',
    tokens: [{"old":"/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.get_me']['types'],
  },
  'clients.index': {
    methods: ["GET","HEAD"],
    pattern: '/clients',
    tokens: [{"old":"/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.index']['types'],
  },
  'clients.store': {
    methods: ["POST"],
    pattern: '/clients',
    tokens: [{"old":"/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.store']['types'],
  },
  'clients.show': {
    methods: ["GET","HEAD"],
    pattern: '/clients/:clientId',
    tokens: [{"old":"/clients/:clientId","type":0,"val":"clients","end":""},{"old":"/clients/:clientId","type":1,"val":"clientId","end":""}],
    types: placeholder as Registry['clients.show']['types'],
  },
  'clients.destroy': {
    methods: ["DELETE"],
    pattern: '/clients/:clientId',
    tokens: [{"old":"/clients/:clientId","type":0,"val":"clients","end":""},{"old":"/clients/:clientId","type":1,"val":"clientId","end":""}],
    types: placeholder as Registry['clients.destroy']['types'],
  },
  'animals.index': {
    methods: ["GET","HEAD"],
    pattern: '/animals',
    tokens: [{"old":"/animals","type":0,"val":"animals","end":""}],
    types: placeholder as Registry['animals.index']['types'],
  },
  'animals.store': {
    methods: ["POST"],
    pattern: '/animals',
    tokens: [{"old":"/animals","type":0,"val":"animals","end":""}],
    types: placeholder as Registry['animals.store']['types'],
  },
  'animals.show': {
    methods: ["GET","HEAD"],
    pattern: '/animals/:animalId',
    tokens: [{"old":"/animals/:animalId","type":0,"val":"animals","end":""},{"old":"/animals/:animalId","type":1,"val":"animalId","end":""}],
    types: placeholder as Registry['animals.show']['types'],
  },
  'animals.destroy': {
    methods: ["DELETE"],
    pattern: '/animals/:animalId',
    tokens: [{"old":"/animals/:animalId","type":0,"val":"animals","end":""},{"old":"/animals/:animalId","type":1,"val":"animalId","end":""}],
    types: placeholder as Registry['animals.destroy']['types'],
  },
  'contacts.index': {
    methods: ["GET","HEAD"],
    pattern: '/contacts',
    tokens: [{"old":"/contacts","type":0,"val":"contacts","end":""}],
    types: placeholder as Registry['contacts.index']['types'],
  },
  'contacts.store': {
    methods: ["POST"],
    pattern: '/contacts',
    tokens: [{"old":"/contacts","type":0,"val":"contacts","end":""}],
    types: placeholder as Registry['contacts.store']['types'],
  },
  'contacts.show': {
    methods: ["GET","HEAD"],
    pattern: '/contacts/:contactId',
    tokens: [{"old":"/contacts/:contactId","type":0,"val":"contacts","end":""},{"old":"/contacts/:contactId","type":1,"val":"contactId","end":""}],
    types: placeholder as Registry['contacts.show']['types'],
  },
  'contacts.destroy': {
    methods: ["DELETE"],
    pattern: '/contacts/:contactId',
    tokens: [{"old":"/contacts/:contactId","type":0,"val":"contacts","end":""},{"old":"/contacts/:contactId","type":1,"val":"contactId","end":""}],
    types: placeholder as Registry['contacts.destroy']['types'],
  },
  'auth.is_authenticated': {
    methods: ["GET","HEAD"],
    pattern: '/is-authenticated',
    tokens: [{"old":"/is-authenticated","type":0,"val":"is-authenticated","end":""}],
    types: placeholder as Registry['auth.is_authenticated']['types'],
  },
  'health_checks': {
    methods: ["GET","HEAD"],
    pattern: '/health',
    tokens: [{"old":"/health","type":0,"val":"health","end":""}],
    types: placeholder as Registry['health_checks']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
