const https = require('https');

https.get('https://api.npoint.io/244f85ea912d9e47ad92', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Base:', res.statusCode, data));
});

https.get('https://api.npoint.io/244f85ea912d9e47ad92/10', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Nested 10:', res.statusCode, data));
});
