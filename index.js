const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const express = require('express')

const app = express()

app.get('/news',(req,res)=>{

    axios.get('https://www.watermarkinsights.com/resources/blog')
  .then(response => {
    const posts = [];
    const $ = cheerio.load(response.data);
    $('.level-two ul li').each((i, element) => {
      
      const title =  $(element).find('h3').text();
      const  description = $(element).find('p').text();
      const image = $(element).find('img').attr('src');

      if (title && description) {
        posts.push({
            title: title,
            description: description,
            image: image
        })
      }
     


    });
    console.log(posts);
    res.json(posts)
    fs.writeFile('posts.json', JSON.stringify(posts), (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Data saved to JSON file');
        }
      });
  })
  .catch(error => {
    console.log(error);
  });

    
})




const PORT = 8000;
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))