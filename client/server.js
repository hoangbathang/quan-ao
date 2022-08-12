/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build'))); 


app.listen(PORT, ()=> {
  console.log('server running on port '+ PORT);
})