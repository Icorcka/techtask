//Task 1
Date.prototype.daysTo = function(anotherDate) {
    const currentDateTimestamp = this.getTime();
    const anotherDateTimestamp = anotherDate.getTime();

    const result = (anotherDateTimestamp - currentDateTimestamp) / (1000 * 60 * 60 * 24);

    return Math.abs(result);
};

const d1 = new Date('2024-01-01');
const d2 = new Date('2024-01-10');
console.log('Task1');
console.log(d1.daysTo(d2));

//Task 2
const orderByTotal = (input) => {
    const inputWithTotal = input.map(x => {
        return ({...x, Total: x.amount * x.quantity})
    });

    return inputWithTotal.sort((a, b) => b.Total - a.Total);
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
    const sourceObject = sourceJson;

    const projectedObject = {};

    for (const key in prototypeObject) {
        if (sourceObject.hasOwnProperty(key)) {
            if (prototypeObject[key] === null) {
                projectedObject[key] = sourceObject[key];
            } else if (typeof sourceObject[key] === 'object' && typeof prototypeObject[key] === 'object') {
                projectedObject[key] = projectObject(sourceObject[key], prototypeObject[key]);
            }
        }
    }

    return projectedObject;
}

const src = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 31,
            prop32: 32
        }
    },
    prop12: 12
}
const proto = {
    prop11: {
        prop22: null
    }
}

console.log("Task3");
console.log(projectObject(src, proto));
