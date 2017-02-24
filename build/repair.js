var fs = require('fs')
var glob = require('glob')

var glob = require("glob")

console.log("Repairing Vendor Css...");

glob("dist/static/css/vendors*.css", function (error, files) {

    if (error) {
        return console.log(error);
    }
    fs.readFile(files[0], 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/url\(static\//g, 'url(../');

        fs.writeFile(files[0], result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

})
