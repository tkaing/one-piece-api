import graphqlM, {GraphQLEnumType, GraphQLID, GraphQLString} from 'graphql';
import FruitEnumType from "../enums/FruitEnum";

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