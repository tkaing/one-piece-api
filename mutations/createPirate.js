import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from 'graphql-relay';
import pirateType from "../types/pirate.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const createPirateMutation = mutationWithClientMutationId({
    name: 'CreatePirate',
    description: 'Creates a Pirate.',
    inputFields: {
        name: { type: GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
        pirate: { type: pirateType }
    },
    mutateAndGetPayload: async (input) => {
        console.log(
            'Mutation.createPirate called with input: ',
            JSON.stringify(input, null, 2)
        );
        const query = await supabase.from('pirate')
            .insert({ name: input.name, fruit: 0 });
        const { data, error } = query;
        if (error)
            console.error(error);
        return { pirate: data[0] };
    },
});

export default createPirateMutation