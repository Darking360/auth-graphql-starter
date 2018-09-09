const graphql = require('graphql');
const UserType = require('./types/user_type');
const authService = require('../services/auth');

const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return authService.signup({
          email, password, req
        });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return authService.login({
          email, password, req
        })
      }
    }
  }
});

module.exports = mutation;
