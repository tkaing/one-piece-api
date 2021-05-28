import graphqlM, { GraphQLID, GraphQLString } from 'graphql';

const {
    GraphQLObjectType
} = graphqlM;

const governmentType = new GraphQLObjectType({
    name: 'Government',
    fields: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
    },
});

export default governmentType