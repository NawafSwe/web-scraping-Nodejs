const rp = require('request-promise');
// url of website
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
// parser
const parser = require('cheerio');

rp(url)
.then(async (html)=>{
    // success then console html page
    //getting number of big links 
    let usPresidents = []; 
    let parsedPage =  parser('.wikitable b > a', html);
   
    let presidentNumber = parser('.wikitable b > a', html).length;
   for(let i = 0; i <  presidentNumber; i++){
       let presidentObj = {};
       let getSinglePresident = parsedPage[i];
               for(let [key,value] of Object.entries(getSinglePresident)){
                   if (key === 'attribs'){
                       const name = value.title;
                    usPresidents.push(name);
                   }
               }
   }
   console.log(usPresidents);
})
.catch((error)=>{
    // handle error
    console.log(error.message);
});