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
  }
`);

const posts = [
    {
        id: 1,
        title: "this is the first title"
    },
    {
        id: 2,
        title: "this is the second title"

    },
    {
        id: 3,
        title: "And here we go with the third and final one"

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