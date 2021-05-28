import graphqlM, { GraphQLID, GraphQLString } from 'graphql';

const {
    GraphQLObjectType
} = graphqlM;

const crewType = new GraphQLObjectType({
    name: 'Crew',
    fields: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
    },
});

export default crewType