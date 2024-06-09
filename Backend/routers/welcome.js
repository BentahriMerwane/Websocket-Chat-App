const { Router } = require('express'); 
const app = Router(); 
  
app.get('/welcome', (req, res) => { 
    res.send("welcome"); 
}); 
  
module.exports = app;
