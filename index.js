import express from 'express';
import graphqlM from 'graphql';
import expressGraphQL from 'express-graphql';
import { createClient } from '@supabase/supabase-js';
import cors from "cors";
import queryType from "./types/query.js";
import mutationType from "./types/mutation.js";
import populateDatabase from "./populateDatabase.js";

const {
    printSchema,
    GraphQLSchema,
} = graphqlM;

const {
    graphqlHTTP
} = expressGraphQL;

// Init Express
const app = express();

// We put objects in our database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
await populateDatabase(supabase);

// Init Schema
const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });
console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

// Build Query
const query = `{
    fruits {
        id
        name
        type
    }
    piratesWithZoan {
        id
        name
    }
    piratesWithLogia {
        id
        name
    }
    piratesWithoutFruit {
        id
        name
    }
    piratesWithParamecia {
        id
        name
    }
}
`;
console.log('Executing a test query :\n', query, '\n');

// Show Result
/*const result = await graphql(schema, query);
console.log('\nExecution result :');
console.log(JSON.stringify(result, null, true), '\n');*/

// Run API
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: {
            defaultQuery: query
        }
    })
);
app.use('/', (req, res) => {
    res.redirect('/graphql');
});
app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');