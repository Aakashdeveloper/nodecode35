import express from 'express';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();
let port = process.env.PORT || 7660;
let app = express();

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    let city = req.query.city?req.query.city:'Delhi';
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=${process.env.KEY}`
    //calling api
    request(url,(err,response)=>{
        if(err) throw err;
        const output = JSON.parse(response.body)
        //res.send(output)
        res.render('index',{title:'WeatherApp', result:output})
    })

})

app.listen(port,(err) =>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})
