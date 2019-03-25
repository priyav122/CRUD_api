const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/api/games', (req, res) => {
    res.send(['Mario', 'Zelda', 'Donkey Kong']);
});
 
app.listen(3000, () => console.log('Listening on port 3000  http://localhost:3000/'));
