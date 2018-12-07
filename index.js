'use stricts'

const fs = require("fs")

console.log("Hello, World!")

console.log(fs.readdirSync('.'))

let reg = /\s(OR)\s/g

let file = fs.readFileSync('LICENSE').toString()

// console.log(file);

matchs = file.match(/\s(OR)\s?\n?/);

// console.log(matchs[0]);


return 0;
let result = reg.exec(file);

console.log(result);

console.log(result.input.substring(result.index, (result.index+20)));


