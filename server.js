const express = require("express");
const app = express();

app.use( express.static(__dirname + "/dist") );
app.listen(process.env.PORT || 8080);

app.get('*', function (req, res) {
    res.sendfile('./dist/index.html'); // load our index.html file
});