const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
  } = graphql;

const books = [
  { name: 'abc', genre: 'educational', id: '1' },
  { name: 'Javascript 101', genre: 'educational', id: '2' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '3' },
];

const authors = [
  { name: 'Juan Carrera', age: 25, id: '1' },
  { name: 'Joseph Stimac', age: 55, id: '2' },
  { name: 'Lauren Phillips', age: 38, id: '3' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString  }
  })
});

const AuthorType = new GraphQLObjectType ({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db or other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});