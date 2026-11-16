import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.get_me': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
    'clients.store': { paramsTuple?: []; params?: {} }
    'clients.show': { paramsTuple: [ParamValue]; params: {'clientId': ParamValue} }
    'clients.destroy': { paramsTuple: [ParamValue]; params: {'clientId': ParamValue} }
    'animals.index': { paramsTuple?: []; params?: {} }
    'animals.store': { paramsTuple?: []; params?: {} }
    'animals.show': { paramsTuple: [ParamValue]; params: {'animalId': ParamValue} }
    'animals.destroy': { paramsTuple: [ParamValue]; params: {'animalId': ParamValue} }
    'contacts.index': { paramsTuple?: []; params?: {} }
    'contacts.store': { paramsTuple?: []; params?: {} }
    'contacts.show': { paramsTuple: [ParamValue]; params: {'contactId': ParamValue} }
    'contacts.destroy': { paramsTuple: [ParamValue]; params: {'contactId': ParamValue} }
    'auth.is_authenticated': { paramsTuple?: []; params?: {} }
    'health_checks': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'clients.store': { paramsTuple?: []; params?: {} }
    'animals.store': { paramsTuple?: []; params?: {} }
    'contacts.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.get_me': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
    'clients.show': { paramsTuple: [ParamValue]; params: {'clientId': ParamValue} }
    'animals.index': { paramsTuple?: []; params?: {} }
    'animals.show': { paramsTuple: [ParamValue]; params: {'animalId': ParamValue} }
    'contacts.index': { paramsTuple?: []; params?: {} }
    'contacts.show': { paramsTuple: [ParamValue]; params: {'contactId': ParamValue} }
    'auth.is_authenticated': { paramsTuple?: []; params?: {} }
    'health_checks': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.get_me': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
    'clients.show': { paramsTuple: [ParamValue]; params: {'clientId': ParamValue} }
    'animals.index': { paramsTuple?: []; params?: {} }
    'animals.show': { paramsTuple: [ParamValue]; params: {'animalId': ParamValue} }
    'contacts.index': { paramsTuple?: []; params?: {} }
    'contacts.show': { paramsTuple: [ParamValue]; params: {'contactId': ParamValue} }
    'auth.is_authenticated': { paramsTuple?: []; params?: {} }
    'health_checks': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'clients.destroy': { paramsTuple: [ParamValue]; params: {'clientId': ParamValue} }
    'animals.destroy': { paramsTuple: [ParamValue]; params: {'animalId': ParamValue} }
    'contacts.destroy': { paramsTuple: [ParamValue]; params: {'contactId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}