/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=b0aef9272bd5539e748f1aa1a1dce780&units=metric';

// UI

const dateText = document.getElementById('date');
const tempText = document.getElementById('temp');
const contentText = document.getElementById('content');
const generateButton = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let lastDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`; // Get current date at time of request

const doStuff = (e)=>{
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getData(baseURL,zipCode,apiKey)
    .then(function(apiData){
        postData('/postData', {temp:apiData.main.temp,date:lastDate,content:feelings})
   })
   .then(()=>updateElements());
}

generateButton.addEventListener('click', doStuff);



// GET request function

const getData = async(baseURL,zipCode,apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey);
    try{
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}


// POST request function
const postData = async(url='/postData',data={})=>{
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
      })
    try{
        const newData = await res.json();
        return newData;
    }
    catch(error){
        console.log('error', error);
    }
};


// Update user UI elements

const updateElements = async() => {
 const req = await fetch('/getData');
 try{
     const dataComplete = await req.json();

     dateText.innerHTML= `Date: ${dataComplete.date}`;
     tempText.innerHTML= `Tempreture: ${Math.round(dataComplete.temp)}°C`;
     contentText.innerHTML= `Feelings: ${dataComplete.content}`;
 }
 catch(error){
     console.log('error', error);
 }
}