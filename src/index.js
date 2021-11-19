import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split,
  // gql,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

// import { setContext } from '@apollo/client/link/context'
import { cache } from './cache'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    //can add AUTH in over webSocket
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('user-token')

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `bearer ${token}` : null,
//     },
//   }
// })

const client = new ApolloClient({
  link: splitLink, //authLink.concat(httpLink)
  cache: cache,
  // typeDefs,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
