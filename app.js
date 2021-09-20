const neatCsv = require('neat-csv');
const fs = require('fs')
var tab = []

function read() {
    var tabM = []
    var tabF = []
    var intf = 0
    var intm = 0
    var ind = 0
    var finalstrm = 0
    var finalstrf = 0
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
        tabM.forEach((f) => {
            finalstrm = finalstrm + f
        })
        tabF.forEach((f) => {
            finalstrf = finalstrf + f
        })
        resultm = (intm * 100) / (data.length - 2)
        resultf = (intf * 100) / (data.length - 2)
        fs.writeFile('Men.csv', finalstrm, {encoding: 'utf8', flag: 'w+', mode: 0o666}, function (err) {});
        console.log('File of men has been updated !');
        fs.writeFile('Women.csv', finalstrf, {encoding: 'utf8', flag: 'w+', mode: 0o666}, function (err) {});
        console.log('File of women has been updated !');
        console.log("The mâle percentage is :", resultm.toFixed(2), "%. The femâle percentage is :", resultf.toFixed(2), "%.")
    })
}
read()
