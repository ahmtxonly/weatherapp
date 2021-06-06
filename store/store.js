import { fetch as fetchPolyfill } from 'whatwg-fetch';
import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import requestMiddleware from './request'
import reducers from '../reducers'
import createFetch from '../createFetch'

let store

const clientFetch = createFetch(fetchPolyfill, {
  baseUrl: process.env.apiUrl,
});

function initStore(initialState) {
  const middleware = [
    thunkMiddleware.withExtraArgument({
      fetch: clientFetch
    }),
    requestMiddleware
  ];

  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
}


export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
