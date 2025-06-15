'use client'    

import { ReactNode } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, ApolloProvider } from '@apollo/client'

// Auth link that reads your JWT from env
const authLink = new ApolloLink((operation, forward) => {
  const token = process.env.NEXT_PUBLIC_HASURA_JWT
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }))
  return forward(operation)
})

// HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
})

// Instantiate ApolloClient
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export function ApolloClientProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
