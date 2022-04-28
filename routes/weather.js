require("dotenv").config();
const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  res.render("index",{
    city:null,
    des:null,
    icon:null,
    temp:null,
    temp_min:null,
    temp_max:null,
    speed:null,
    humidity:null
  });
});

// display on the command

router.post("/", async (req, res) => {
  const city = req.body.city;

  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  const response = await fetch(url_api);
  const body = await response.text();

  try {
    await fetch(url_api)
     .then(res => res.json())
     .then(data =>{
         if (data.message === 'city not found') {
             res.render('index',{
                 city:data.message,
                 des:null,
                 icon:null,
                 temp:null,
                 temp_min:null,
                 temp_max:null,
                 speed:null,
                 humidity:null
             })   
         }else{
             const city =data.name;
             const des = data.weather[0].description;
             const temp =data.main.temp;
             const temp_min =data.main.temp_min;
             const temp_max =data.main.temp_max;
             const speed = data.wind.speed;
             const humidity = data.main.humidity;

             res.render('index',{
                 city,des,temp,temp_min,temp_max,speed,humidity
                 });
         }
     }); 
  } catch (err) {
      res.render('index',{
          city:'something went wrong',
          des:null,
          temp:null,
          temp_min:null,
          temp_max:null,
          speed:null,
          humidity:null
      })
  }
});

module.exports = router;
