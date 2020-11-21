/*

Design a cash register drawer function checkCashRegister() 
that accepts purchase price as the first argument (price), payment as the second argument (cash), 
and cash-in-drawer (cid) as the third argument.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due,
or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the 
key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, 
lowest order, as the value of the change key.
*/

function checkCashRegister(price, cash, cid) {
    console.log(cid);
    const values = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100,
    }

    let change = [];
    let totalSum = 0;
    let returnVal = cash - price;
    let toReturn = returnVal;
    let reversedArr = [];

    for (let i = cid.length - 1; i >= 0; i--) {
        reversedArr.push(cid[i]);
    }

    let totalInDrawer = cid.reduce((a, b) => a + b[1], 0);

    if (totalInDrawer < returnVal) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (totalInDrawer === returnVal) {
        return { status: "CLOSED", change: cid }
    }

    for (let i = 0; i < reversedArr.length; i++) {
        if (values[reversedArr[i][0]] <= toReturn && reversedArr[i][1] > 0) {
            let current = 0;
            while (totalSum < returnVal && reversedArr[i][1] > 0 &&
                (totalSum + values[reversedArr[i][0]]).toFixed(2) <= returnVal) {
                totalSum += values[reversedArr[i][0]];
                current += values[reversedArr[i][0]];
                toReturn -= values[reversedArr[i][0]];
                reversedArr[i][1] -= values[reversedArr[i][0]];
            }

            if (current) {
                change.push([reversedArr[i][0], current]);
            }
        }
    }

    if (totalSum < returnVal) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change };
}