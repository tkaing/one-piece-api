import { createClient } from "@supabase/supabase-js";
import graphqlM, { GraphQLList, GraphQLNonNull } from 'graphql';

import crewType from "./crew.js";
import navyType from "./navy.js";
import pirateType from "./pirate.js";
import governmentType from "./government.js";

const {
    GraphQLObjectType
} = graphqlM;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        crews: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(crewType))),
            resolve: () => listByTable('crew')
        },
        navies: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(navyType))),
            resolve: () => listByTable('navy')
        },
        pirates: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(pirateType))),
            resolve: () => listByTable('pirate')
        },
        governments: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(governmentType))),
            resolve: () => listByTable('government')
        },
    }
});

const listByTable = async (table) => {
    const { data, error } = await supabase
        .from(table)
        .select('*');
    if (error)
        console.error(error);
    return data;
};

export default queryType