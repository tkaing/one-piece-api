import * as crew from './datasource/crew.js';
import * as navy from './datasource/navy.js';
import * as pirate from './datasource/pirate.js';
import * as government from './datasource/government.js';

export default async (supabase) => {

    const crewResult = await supabase.from('crew').upsert([
        crew.law,
        crew.luffy,
        crew.kaido,
        crew.bigMom,
        crew.shanks,
        crew.barbeNoire
    ]);

    const navyResult = await supabase.from('navy').upsert([
        navy.akainu,
        navy.kizaru,
    ]);

    const pirateResult = await supabase.from('pirate').upsert([
        pirate.law,
        pirate.luffy,
        pirate.chopper,
        pirate.barbeNoire
    ]);

    const governmentResult = await supabase.from('government').upsert([
        government.kaku,
        government.lucci,
        government.stussy,
        government.magellan
    ]);

    console.log('Upsert CREW', crewResult);
    console.log('Upsert NAVY', navyResult);
    console.log('Upsert PIRATE', pirateResult);
    console.log('Upsert GOVERNMENT', governmentResult);

    console.log('Database populated !\n');
};
