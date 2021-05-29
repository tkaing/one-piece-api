import graphqlM, {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import FruitEnumType from "../enums/FruitEnum.js";

const {
    GraphQLObjectType
} = graphqlM;

const fruitType = new GraphQLObjectType({
    name: 'Fruit',
    fields: {
        id: {
            type: GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        type: {
            type: GraphQLNonNull(FruitEnumType),
            resolve: (obj) => obj.type
        }
    },
});

export default fruitType