import {
    GraphQLEnumType,
} from 'graphql';

const FruitEnumType = new GraphQLEnumType({
    name: 'FruitEnum',
    values: {
        OTHER: { value: 0 },
        ZOAN: { value: 1 },
        LOGIA: { value: 2 },
        PARAMECIA: { value: 3 },
    },
});

export default FruitEnumType