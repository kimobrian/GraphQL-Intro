var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var users = [
  {
    id:1,
    name: 'Brian',
    age: '21',
    gender: 'M'
  },
  {
    id:2,
    name: 'Kim',
    age: '22',
    gender: 'M'
  },
  {
    id:3,
    name: 'Joseph',
    age: '23',
    gender: 'M'
  },
  {
    id:4,
    name: 'Faith',
    age: '24',
    gender: 'F'
  },
  {
    id:5,
    name: 'Joy',
    age: '25',
    gender: 'F'
  }
]

var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users: [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    gender: String
  }
`);

var getUser = function(args) {
  var userID = args.id;
  return users.filter(user => {
    return user.id == userID;
  })[0];
}

var retrieveUsers = function(args) {

}

var root = { 
  user: getUser,
  users: retrieveUsers
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));