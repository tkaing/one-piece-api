import graphqlM, { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import fruitType from "./fruit.js";
import {createClient} from "@supabase/supabase-js";

const {
    GraphQLObjectType
} = graphqlM;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const pirateType = new GraphQLObjectType({
    name: 'Pirate',
    fields: {
        id: {
            type: GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        fruit: {
            type: fruitType,
            resolve: async (obj) => {
                const fruitResponse = await supabase
                    .from('fruit')
                    .select('*')
                    .match({ id: obj.fruit });
                return fruitResponse.data[0];
            }
        }
    }
});

export default pirateType