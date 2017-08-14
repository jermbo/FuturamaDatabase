const axios = require('axios');
const baseURL = 'http://localhost:3000';
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const CharacterNameType = new GraphQLObjectType({
  name: 'CharacterName',
  fields: () => ({
    first: {type: GraphQLString},
    middle: {type: GraphQLString},
    last: {type: GraphQLString},
  })
});

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: CharacterNameType},
    age: {type: GraphQLString},
    gender: {type: GraphQLString},
    species: {type: GraphQLString},
    homePlanet: {type: GraphQLString},
    occupation:{type: GraphQLString},
    // sayings: {type: []}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    character: {
      type: CharacterType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args){
        return axios.get(`${baseURL}/characters/${args.id}`)
          .then(res => res.data);
      }
    },
    characters: {
      type: new GraphQLList(CharacterType),
      resolve(parentValue, args){
        return axios.get(`${baseURL}/characters/`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
