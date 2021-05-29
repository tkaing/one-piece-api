import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from 'graphql-relay';
import { createClient } from "@supabase/supabase-js";
import FruitEnumType from "../enums/FruitEnum.js";
import fruitType from "../types/fruit.js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const createFruitMutation = mutationWithClientMutationId({
    name: 'CreateFruit',
    description: 'Creates a Fruit.',
    inputFields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(FruitEnumType) },
    },
    outputFields: {
        fruit: { type: fruitType }
    },
    mutateAndGetPayload: async (input) => {
        console.log(
            'Mutation.createFruit called with input: ',
            JSON.stringify(input, null, 2)
        );
        const query = await supabase.from('fruit')
            .insert({
                name: input.name,
                type: input.type,
            });
        const { data, error } = query;
        if (error)
            console.error(error);
        return { fruit: data[0] };
    },
});

export default createFruitMutation