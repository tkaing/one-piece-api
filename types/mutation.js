import {
    GraphQLObjectType
} from 'graphql';

import createPirateMutation from "../mutations/createPirate.js";
import updateFruitForPirateMutation from "../mutations/updateFruitForPirate.js";
import createFruitMutation from "../mutations/createFruit.js";

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createFruit: createFruitMutation,
        createPirate: createPirateMutation,
        updateFruitForPirate: updateFruitForPirateMutation
    }
});

export default mutationType
