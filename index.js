const express= require('express');
const app =express();

// defining the port number
const port= 8000;

// Including layouts to the file
const expressLayouts= require('express-ejs-layouts');

// Using expressLayouts
app.use(expressLayouts);

// Including or using assets files
app.use(express.static('./assets'));

// Extract style and scripts from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('layout extractImages', true);
app.set('layout extractFonts', true);

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