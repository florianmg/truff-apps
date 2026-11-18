/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [[0,"register"]],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.get_me': {
    methods: ["GET","HEAD"],
    pattern: '/me',
    tokens: [[0,"me"]],
    types: placeholder as Registry['auth.get_me']['types'],
  },
  'clients.index': {
    methods: ["GET","HEAD"],
    pattern: '/clients',
    tokens: [[0,"clients"]],
    types: placeholder as Registry['clients.index']['types'],
  },
  'clients.store': {
    methods: ["POST"],
    pattern: '/clients',
    tokens: [[0,"clients"]],
    types: placeholder as Registry['clients.store']['types'],
  },
  'clients.show': {
    methods: ["GET","HEAD"],
    pattern: '/clients/:clientId',
    tokens: [[0,"clients"],[1,"clientId"]],
    types: placeholder as Registry['clients.show']['types'],
  },
  'clients.destroy': {
    methods: ["DELETE"],
    pattern: '/clients/:clientId',
    tokens: [[0,"clients"],[1,"clientId"]],
    types: placeholder as Registry['clients.destroy']['types'],
  },
  'animals.index': {
    methods: ["GET","HEAD"],
    pattern: '/animals',
    tokens: [[0,"animals"]],
    types: placeholder as Registry['animals.index']['types'],
  },
  'animals.store': {
    methods: ["POST"],
    pattern: '/animals',
    tokens: [[0,"animals"]],
    types: placeholder as Registry['animals.store']['types'],
  },
  'animals.show': {
    methods: ["GET","HEAD"],
    pattern: '/animals/:animalId',
    tokens: [[0,"animals"],[1,"animalId"]],
    types: placeholder as Registry['animals.show']['types'],
  },
  'animals.destroy': {
    methods: ["DELETE"],
    pattern: '/animals/:animalId',
    tokens: [[0,"animals"],[1,"animalId"]],
    types: placeholder as Registry['animals.destroy']['types'],
  },
  'contacts.index': {
    methods: ["GET","HEAD"],
    pattern: '/contacts',
    tokens: [[0,"contacts"]],
    types: placeholder as Registry['contacts.index']['types'],
  },
  'contacts.store': {
    methods: ["POST"],
    pattern: '/contacts',
    tokens: [[0,"contacts"]],
    types: placeholder as Registry['contacts.store']['types'],
  },
  'contacts.show': {
    methods: ["GET","HEAD"],
    pattern: '/contacts/:contactId',
    tokens: [[0,"contacts"],[1,"contactId"]],
    types: placeholder as Registry['contacts.show']['types'],
  },
  'contacts.destroy': {
    methods: ["DELETE"],
    pattern: '/contacts/:contactId',
    tokens: [[0,"contacts"],[1,"contactId"]],
    types: placeholder as Registry['contacts.destroy']['types'],
  },
  'auth.is_authenticated': {
    methods: ["GET","HEAD"],
    pattern: '/is-authenticated',
    tokens: [[0,"is-authenticated"]],
    types: placeholder as Registry['auth.is_authenticated']['types'],
  },
  'health_checks': {
    methods: ["GET","HEAD"],
    pattern: '/health',
    tokens: [[0,"health"]],
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
