const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: ID!): User
    }

    type Book {
        authors: [String]
        bookId: String
        title: String
        description: String
        image: String
        link: String
    }

    type User {
        username: String
        email: String
        password: String
        _id: ID
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    input BookInput {
        bookId: String
        authors: [String]
        title: String
        description: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
      }
`;

module.exports = typeDefs