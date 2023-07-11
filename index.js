const express= require('express');
const app =express();

// defining the port number
const port= 8000;

// Use express router
app.use('/', require('./routes/index'));

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
    
// Connecting to server
app.listen(port, function(err){
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return; 
    }
    console.log(`Server is running on the port: ${port}`);
});