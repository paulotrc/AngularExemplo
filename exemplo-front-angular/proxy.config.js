const proxy = [
    {
        context: '/iga-api',
        target: 'http://localhost:4200',
         pathRewrite: { '^/iga-api': '/iga-api/api'},
        'secure': false
    }
];
module.exports = proxy;
