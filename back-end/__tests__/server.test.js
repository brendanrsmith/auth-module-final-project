'use strict';

const supergoose = require('@code-fellows/supergoose');

const { server } = require('../src/server.js'); 
// const supertest = require('supertest'); 
const mockRequest = supergoose(server); 

describe('***Server Actions***', () => {
  it('should respond with a 404 on not found', async () => {
    return mockRequest.get('/no-thing').then(data => {
      expect(data.status).toBe(404);
    });
  });

  it('should respond with a 404 on bad method', async () => {
    return mockRequest.patch('/food').then(data => {
      expect(data.status).toBe(404);
    });
  });

});
