const express = require('express');
const app = express();

// app.get('/',(req,res)=>{
// res.send("hello server is reuning");
// })
app.use(express.static('public'));
//the given true display the given value in the input box it will show in the terminal
app.use(express.urlencoded({extended:true}))

const weatherRoute =require('./routes/weather');
app.set('view engine','ejs');

app.use('/',weatherRoute);
// const PORT = process.env.PORT|| 4000;

// app.listen(PORT,()=>console.log(`server starting at port $(PORT)`));
app.listen (process.env.PORT || 4000,()=>{
    console.log(`server starting at port $(PORT)`);
})