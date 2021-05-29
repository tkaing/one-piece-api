import { createClient } from "@supabase/supabase-js";
import graphqlM, { GraphQLList, GraphQLNonNull } from 'graphql';

import fruitType from "./fruit.js";
import pirateType from "./pirate.js";

const {
    GraphQLObjectType
} = graphqlM;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        fruits: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(fruitType))),
            resolve: () => listOfFruits()
        },
        piratesWithZoan: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(pirateType))),
            resolve: () => listOfPiratesByFruit(1)
        },
        piratesWithLogia: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(pirateType))),
            resolve: () => listOfPiratesByFruit(2)
        },
        piratesWithoutFruit: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(pirateType))),
            resolve: () => listOfPiratesByFruit()
        },
        piratesWithParamecia: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(pirateType))),
            resolve: () => listOfPiratesByFruit(3)
        },
    }
});

const listOfFruits = async () => {
    const { data, error } = await supabase
        .from('fruit')
        .select('*');
    if (error)
        console.log(error);
    return data;
};

const listOfPiratesByFruit = async (fruitEnumValue = null) => {
    if (fruitEnumValue === null) {
        let { data, error } = await supabase
            .from('pirate')
            .select('*')
            .match({ fruit: 0 });
        return data;
    }
    const fruitResponse = await supabase
        .from('fruit')
        .select('id')
        .match({ type: fruitEnumValue });
    const pirateResponse = await supabase
        .from('pirate')
        .select('*')
        .in('fruit', fruitResponse.data.map(_it => _it.id));
    return pirateResponse.data;
};

export default queryType