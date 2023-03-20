import { ApolloServer, gql } from 'apollo-server'
import { randomUUID } from 'crypto'

/**
 * Under Fetching
 * Quando um endpoint que retorno menos dados do que o necessário.
 * 
 * Over Fetching
 * Quando um endpoint que retorno mais dados do que o necessário.
 */

/**
 * Schema First Approach
 * Code First Approach
 * - Schema é criado de forma automática de acordo com o nosso código nos resolvers
 */

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`

interface User {
  id: string;
  name: string;
}

const users: User[] = []

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users
      }
    },

    Mutation: {
      createUser: (parent, args, ctx) => {
        users.push({
          id: randomUUID(),
          name: args.name,
        })

        return users
      }
    }
  }
})

server.listen().then(({ url }) => {
    console.log(`🚀 HTTP Server is running on ${url}`)
})