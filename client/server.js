/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const app = express();

let PORT = process.env.PORT || 3000;
app.use(express.static('build'));
app.use(express.static(path.join(__dirname, 'build'))); 

app.get('*', function(req, res) {     res.sendFile(path.join(__dirname + '/build/index.html')); });
app.listen(PORT, ()=> {
  console.log('server running on port '+ PORT);
})