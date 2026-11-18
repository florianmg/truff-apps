/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractRawResponse, ExtractResponse, Method, PathWithRegistry, PatternsByMethod, RouteWithRegistry } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'
import type { routes } from './index.ts'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.register': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['register']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['register']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['logout']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['logout']>>>
    }
  }
  'auth.get_me': {
    methods: ["GET","HEAD"]
    pattern: '/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['getMe']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['getMe']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['getMe']>>>
    }
  }
  'clients.index': {
    methods: ["GET","HEAD"]
    pattern: '/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/client').listClientsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clients.store': {
    methods: ["POST"]
    pattern: '/clients'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/client').createClientValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/client').createClientValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clients.show': {
    methods: ["GET","HEAD"]
    pattern: '/clients/:clientId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { clientId: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/client').clientIdParamsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clients.destroy': {
    methods: ["DELETE"]
    pattern: '/clients/:clientId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/client').clientIdParamsValidator)>>
      paramsTuple: [ParamValue]
      params: { clientId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/client').clientIdParamsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/clients_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'animals.index': {
    methods: ["GET","HEAD"]
    pattern: '/animals'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/animal').listAnimalsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'animals.store': {
    methods: ["POST"]
    pattern: '/animals'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/animal').createAnimalValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/animal').createAnimalValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'animals.show': {
    methods: ["GET","HEAD"]
    pattern: '/animals/:animalId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { animalId: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/animal').animalIdParamsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'animals.destroy': {
    methods: ["DELETE"]
    pattern: '/animals/:animalId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/animal').animalIdParamsValidator)>>
      paramsTuple: [ParamValue]
      params: { animalId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/animal').animalIdParamsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/animals_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'contacts.index': {
    methods: ["GET","HEAD"]
    pattern: '/contacts'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/contact').listContactsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'contacts.store': {
    methods: ["POST"]
    pattern: '/contacts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/contact').createContactValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/contact').createContactValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'contacts.show': {
    methods: ["GET","HEAD"]
    pattern: '/contacts/:contactId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { contactId: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/contact').contactIdParamsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'contacts.destroy': {
    methods: ["DELETE"]
    pattern: '/contacts/:contactId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/contact').contactIdParamsValidator)>>
      paramsTuple: [ParamValue]
      params: { contactId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/contact').contactIdParamsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/contacts_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.is_authenticated': {
    methods: ["GET","HEAD"]
    pattern: '/is-authenticated'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['isAuthenticated']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['isAuthenticated']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/auth_controller').default['isAuthenticated']>>>
    }
  }
  'health_checks': {
    methods: ["GET","HEAD"]
    pattern: '/health'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/controllers/health_checks_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/controllers/health_checks_controller').default['handle']>>>
      rawResponse: ExtractRawResponse<Awaited<ReturnType<import('#app/controllers/health_checks_controller').default['handle']>>>
    }
  }
}

export namespace Route {
  export type Request<Name extends keyof typeof routes> = RouteWithRegistry.Request<typeof routes, Name>
  export type Response<Name extends keyof typeof routes> = RouteWithRegistry.Response<typeof routes, Name>
  export type Params<Name extends keyof typeof routes> = RouteWithRegistry.Params<typeof routes, Name>
  export type Body<Name extends keyof typeof routes> = RouteWithRegistry.Body<typeof routes, Name>
  export type Query<Name extends keyof typeof routes> = RouteWithRegistry.Query<typeof routes, Name>
  export type Error<Name extends keyof typeof routes> = RouteWithRegistry.Error<typeof routes, Name>
}

export namespace Path {
  export type Request<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Request<typeof routes, M, P>
  export type Response<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Response<typeof routes, M, P>
  export type Params<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Params<typeof routes, M, P>
  export type Body<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Body<typeof routes, M, P>
  export type Query<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Query<typeof routes, M, P>
  export type Error<M extends Method, P extends PatternsByMethod<typeof routes, M>> =
    PathWithRegistry.Error<typeof routes, M, P>
}
