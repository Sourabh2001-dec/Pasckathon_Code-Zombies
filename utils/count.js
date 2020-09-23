let fs = require('fs');
let path = require("path");
const filepath = path.join(__dirname,"../data/count.json")

const incrcount = (collegeid,locationid) => {
    var counts = JSON.parse(fs.readFileSync(filepath).toString());
    var prev = counts[collegeid][locationid] ? counts[collegeid][locationid] : 0
    counts[collegeid][locationid] = prev + 1
    fs.writeFileSync(filepath, JSON.stringify(counts));
    return counts 
}
const decrcount = (collegeid,locationid) => {
    var counts = JSON.parse(fs.readFileSync(filepath).toString());
    counts[collegeid][locationid] = counts[collegeid][locationid] - 1
    fs.writeFileSync(filepath, JSON.stringify(counts));
    return counts 
}

const getCount = (collegeid,locationid) => {
    var counts = JSON.parse(fs.readFileSync(filepath).toString());
    let res = counts[collegeid][locationid] ? counts[collegeid][locationid] : 0
    return res 
}


module.exports = incrcount
module.exports = decrcount
module.exports = getCount