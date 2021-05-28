import {
    GraphQLEnumType,
} from 'graphql';

const RoleEnumType = new GraphQLEnumType({
    name: 'RoleEnum',
    values: {
        OTHER: {
            value: 0
        },
        CAPTAIN: {
            value: 1
        },
        NAVIGATOR: {
            value: 2
        },
        PHYSICIAN: {
            value: 3
        }
    },
});

export default RoleEnumType