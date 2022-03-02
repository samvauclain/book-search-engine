const express = require('express');
const app = express();
const {ApolloServer} = require('apollo-server-express')
const {resolvers, typeDefs} = require('./schemas');
const {authMiddleware} = require('./utils/auth')
const db = require('./config/connection');
const path = require('path')
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});