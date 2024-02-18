//Task 1
Date.prototype.daysTo = function(anotherDate) {
    const currentDateTimestamp = this.getTime();
    const anotherDateTimestamp = anotherDate.getTime();

    const result = (this - anotherDate) / (1000 * 60 * 60 * 24);

    return Math.floor(Math.abs(result));
};

const d1 = new Date('2024-01-01T10:12:01');
const d2 = new Date('2024-01-02');
console.log('Task1');
console.log(d1.daysTo(d2));

//Task 2
const orderByTotal = (input, sorting) => {
    const inputWithTotal = input.map(x => {
        return ({...x, Total: x.amount * x.quantity})
    });

    const ascSortingQuery = (a, b) => a.Total - b.Total;
    const descSortingQuery = (a, b) =>  b.Total - a.Total;
    return inputWithTotal.sort(sorting === "asc" ? ascSortingQuery : descSortingQuery);
}

console.log('Task2');
console.log(orderByTotal([
    { amount: 1000, quantity: 5 },
    { amount: 1025, quantity: 3 },
    { amount: 1611, quantity: 7 },
    { amount: 1500, quantity: 9 },
    { amount: 1467, quantity: 9 },
    { amount: 933, quantity: 2 },
]));

//Task3
const projectObject = (sourceJson, prototypeObject) => {
    const result = {};

    for (const key in prototypeObject) {
        if (prototypeObject.hasOwnProperty(key) && sourceJson.hasOwnProperty(key)) {
            const sourceValue = sourceJson[key];
            const prototypeValue = prototypeObject[key];

            if (typeof sourceValue === 'object' && sourceValue !== null && 
                typeof prototypeValue === 'object' && prototypeValue !== null) {
                result[key] = projectObject(sourceValue, prototypeValue);
            } else if (typeof sourceValue === typeof prototypeValue || sourceValue === null) {
                result[key] = sourceValue;
            }
        }
    }

    return result;
}

// const src = {
//     prop11: {
//         prop21: 21,
//         prop22: {
//             prop31: 31,
//             prop32: 32
//         }
//     },
//     prop12: 12
// }
// const proto = {
//     prop11: {
//         prop22: null
//     }
// }

const src = {
    prop22: null,
    prop33: {
        prop331: 1,
        prop332:2
    },
    prop11: {
        prop111: "value",
        prop112: {
            prop112: null
        }
    }
};

const proto = {
    prop11:
        {
            prop22: null,
            prop111: {
                prop111: null
            },
            prop112: null
        },
    prop33: {},
    prop22: 2
};

// const result = {
//     prop22: null,
//     prop33: {},
//     prop11: {prop112: {
//             prop112: null
//         }}
// };

console.log("Task3");
console.log(projectObject(src, proto));
