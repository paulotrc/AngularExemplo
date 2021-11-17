'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'exemplo',
    urls: [
        {
            params: '/list',
            requests: [{
                method: 'GET',
                response: '/response-files/ExemploListMock.json',
                statusCode: 200
            }]
        },
        {
            params: '/details/{id}',
            requests: [{
                method: 'GET',
                response: '/response-files/ExemploDetailsMock.json',
                statusCode: 200
            }]
        },
        {
            params: '/delete/{id}',
            requests: [{
                method: 'DELETE',
                response: { status: 'ok' },
                statusCode: 200
            }]
        },
        {
            requests: [{
                method: 'POST',
                response: { status: 'ok' },
                statusCode: 201
            }]
        },
        {
            requests: [{
                method: 'PUT',
                response: { status: 'ok' },
                statusCode: 200
            }]
        }
    ]
});
