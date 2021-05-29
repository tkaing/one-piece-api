import { GraphQLID, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from 'graphql-relay';
import pirateType from "../types/pirate.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const updateFruitForPirateMutation = mutationWithClientMutationId({
    name: 'UpdateFruitForPirate',
    description: 'Updates fruit for a Pirate.',
    inputFields: {
        fruitId: { type: GraphQLNonNull(GraphQLID) },
        pirateId: { type: GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
        pirate: { type: pirateType }
    },
    mutateAndGetPayload: async (input) => {
        console.log(
            'Mutation.updateFruitForPirate called with input: ',
            JSON.stringify(input, null, 2)
        );
        const query = await supabase
            .from('pirate')
            .update({ fruit: input.fruitId })
            .match({ id: input.pirateId });
        const { data, error } = query;
        if (error)
            console.log(error);
        return { pirate: data[0] };
    },
});

export default updateFruitForPirateMutation