// require express module
const express = require('express');
const app = express();
const PORT = 7000;

// start server on Port 7000
app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
})