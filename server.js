const express = require("express")
const app = express();


 const port = process.env.port || 9001
 app.use(express.urlencoded({extended:true}))


 app.use(require("./routes/index"))

 app.listen(port,(req,res)=>{
    console.log(`connected to the port:${port}`)
 })


 

 