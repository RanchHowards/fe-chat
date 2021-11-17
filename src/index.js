import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  // gql,
} from '@apollo/client'

// import { setContext } from '@apollo/client/link/context'
import { cache } from './cache'
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

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
  link: httpLink, //authLink.concat(httpLink)
  cache: cache,
  // typeDefs,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
