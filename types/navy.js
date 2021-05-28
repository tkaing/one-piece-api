import graphqlM, { GraphQLID, GraphQLString } from 'graphql';

const {
    GraphQLObjectType
} = graphqlM;

const navyType = new GraphQLObjectType({
    name: 'Navy',
    fields: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
    },
});

export default navyType