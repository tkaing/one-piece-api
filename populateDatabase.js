import * as fruit from './datasource/fruit.js';
import * as pirate from './datasource/pirate.js';

export default async (supabase) => {

    const fruitResult = await supabase.from('fruit').upsert([
        fruit.law,
        fruit.luffy,
    ]);

    const pirateResult = await supabase.from('pirate').upsert([
        pirate.law,
        pirate.luffy,
    ]);

    console.log('Upsert FRUIT', fruitResult);
    console.log('Upsert PIRATE', pirateResult);

    console.log('Database populated !\n');
};
