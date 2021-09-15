const neatCsv = require('neat-csv');
const fs = require('fs')
var tab = []

function read() {
    var tabM = []
    var tabF = []
    var intf = 0
    var intm = 0
    var ind = 0
    fs.readFile('./MOCK_DATA.csv', 'utf8',function (err, data) {
        if (err) {
            console.error(err)
            return
        }
        data.split('\n').forEach((e) => {
            if (e.length > 1) {
                e = e.split(',')
                tab.push({id: e[0], first_name: e[1], last_name: e[2], email: e[3], gender: e[4]})
            }
        })
        data = data.split('\n')
        tab.forEach((f) => {
            if (f.gender[0] == 'M') {
                tabM.push(data[ind + 1] + '\n')
                intm += 1
                ind ++
            } else if (f.gender[0] == 'F') {
                tabF.push(data[ind + 1] + '\n')
                intf += 1
                ind ++
            }
        })
        console.log(data[0])
        fs.writeFile('Men.csv', data[0] + "\n", {encoding: 'utf8', flag: 'w+', mode: 0o666}, function (err) {});
        tabM.forEach((e) => {
            fs.writeFile('Men.csv', e, {encoding: 'utf8', flag: 'a+', mode: 0o666}, function (err) {});
        })
        console.log('File of men has been updated !');
        fs.writeFile('Women.csv', data[0] + "\n", {encoding: 'utf8', flag: 'w+', mode: 0o666}, function (err) {});
        tabF.forEach((e) => {
            fs.writeFile('Women.csv', e, {encoding: 'utf8', flag: 'a+', mode: 0o666}, function (err) {});
        })
        console.log('File of women has been updated !');
        console.log("The mâle percentage is :", (intm * 100) / data.length, "%. The femâle percentage is :", (intf * 100) / data.length, "%.")
    })
}
read()
