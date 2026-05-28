const https = require('https');

https.get('https://api.npoint.io/0fc011d95f8e6b2da1c3', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Base:', res.statusCode, data));
});

https.get('https://api.npoint.io/0fc011d95f8e6b2da1c3/10', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Nested 10:', res.statusCode, data));
});
