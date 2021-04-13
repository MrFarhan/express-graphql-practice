const express = require('express');
var { graphql, buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');


const app = express();

const schema = buildSchema(`
  type Query {
    Post(id:Int!) : Post
    posts: [Post]
  }
  type Post {
      id: Int
      title:String
      comments: [Comment]
  }
  type Comment {
      user:String
      text:String
  }
`);

const posts = [
    {
        id: 1,
        title: "this is the first title",
        comments: [
            {
                user: "MrFarhan",
                text: "Graphql is awsome"
            },
            {
                user: "John",
                text: "GQL is a Query language"
            }
        ]
    }
]

const root = {
    Post: ({ id }) => {
        // return posts[id]
        return posts.find(post => post.id === id);
    },
    posts: () => {
        return posts
    }
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