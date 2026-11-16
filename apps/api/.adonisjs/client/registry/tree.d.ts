/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    logout: typeof routes['auth.logout']
    getMe: typeof routes['auth.get_me']
    isAuthenticated: typeof routes['auth.is_authenticated']
  }
  clients: {
    index: typeof routes['clients.index']
    store: typeof routes['clients.store']
    show: typeof routes['clients.show']
    destroy: typeof routes['clients.destroy']
  }
  healthChecks: typeof routes['health_checks']
}
