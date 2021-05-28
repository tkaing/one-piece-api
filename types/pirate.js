import graphqlM, {GraphQLID, GraphQLString} from 'graphql';

const {
    GraphQLObjectType
} = graphqlM;

const pirateType = new GraphQLObjectType({
    name: 'Pirate',
    fields: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        }
    }
});

export default pirateType