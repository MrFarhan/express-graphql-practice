const express = require('express');
var { graphql, buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');


const app = express();

var schema = buildSchema(`
  type Query {
    hello: String
    getPost : Post
  }
  type Post {
      id: Int
      title:String
  }
`);

var root = {
    hello: () => 'Hello world!',
    getPost: () => ({
        id: "1",
        title: "temp title here"
    })
};

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    }),
);

app.listen(4000, () => {
    console.log("server is listning at 4000")
});