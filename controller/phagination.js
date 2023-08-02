const db = require("../db")

const resultsperpage = 5;
let sql = "select *from tbl_code";
db.query(sql, (err, result) => {
    if (err) throw err;
    const numofResult = result.length;
    const numofPages = Math.ceil(numofResults / resultsperpage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numofPages) {
        res.send("/?page=" + encodeURIComponent(numofPages));
    } elseif(page < 1)
    {
        res.send("/?page=" + encodeURIComponent('1'));
    }
})

const startingLimit = (page - 1) * resultsperpage;
sql = `SELECT * FROM tbl_code ${startingLimit},${resultperpage}`;

db.query(sq, (err, result) => {
    if (err) throw err;


    let iterator = (page - 5) < 1 ? 1 : page - 5;
    let endingLink = (iterator + 9) <= numberofPgaes ? (iterator + 9) : page + (numberofPgaes)
    if (endinglink < (page + 4)) {
        iterator -= (page + 4) - numberofPgaes;
    }
    res.render('index',{ data: result, page, iterator, endingLink, numberofPgaes, })



})