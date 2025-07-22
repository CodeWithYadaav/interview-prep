// function flattenObject(obj, parentKey = '', result = {}) {
//     for (let key in obj) {
//         const value = obj[key];
//         const fullKey = parentKey ? `${parentKey}.${key}` : key;

//         if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
//             flattenObject(value, fullKey, result);
//         } else {
//             result[fullKey] = value;
//         }
//     }
//     return result;
// }








function flattenObject(obj, parentKey = '', result = {}) {

    for (let key in obj) {
        let value = obj[key]
        const fullkey = parentKey ? `${parentKey}.${key}` : key
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            flattenObject(value, fullkey, result)
        } else {
            result[fullkey] = value
        }
    }
    return result

}

const input = {
    a: { b: { c: 1 } },
    d: 2,
    e: {
        f: 3,
        g: {
            h: 4
        }
    }
};

console.log(flattenObject(input));


//output ==>   {
//     "a.b.c": 1,
//     "d": 2
//   }
