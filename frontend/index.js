const express = require("express");
const finalhandler = require("finalhandler");
const servestatic = require("serve-static");

const port = 8080;
const serve = servestatic("./");
const app = express();

app.get("*", (req, res) => {
    console.log(`req => [url=${req.url}]`)
    var done = finalhandler(req, res);
    serve(req, res, done);
});

app.post("/a/upload", (req, res) => {
    res.send(
        {
            "wordsNumber": 547,
            "charsNumber": 3668, 
            "charsNoSpacesNumber": 3215, 
            "wordsNumberNN": 518, 
            "charsNumberNN": 3607, 
            "charsNoSpacesNumberNN": 3154, 
            "fileName": "pitch-deck.pdf", 
            "error": null
        }
    );
});

app.listen(port, () => {
    console.log(`server started [port=${port}]`)
});
