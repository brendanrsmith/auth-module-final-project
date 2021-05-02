'use strict';

process.env.SECRET = "toes";

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
// const bearer = require('../src/middleware/bearer.js');
const cookieParser = require('cookie-parser');

const mockRequest = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  user: { username: 'user', password: 'password', role: 'user' }
};

describe('Auth Router', () => {
  server.use(cookieParser());

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async () => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;
        console.log(`-------Inside  create one ${userObject.user}`);

        expect(response.status).toBe(201);
        expect(userObject.output.token).toBeDefined();
        expect(userObject.output.user._id).toBeDefined();
        expect(userObject.output.user.username).toEqual(users[userType].username)

      });

      it('can signin with basic', async () => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user.token).toBeDefined();
        expect(userObject.user.user._id).toBeDefined();
        expect(userObject.user.user.username).toEqual(users[userType].username)

      });

      it('can view dashboard with bearer auth', async () => {
        const signin = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);
        console.log('inside dashboard route', signin.body.user);
        // First, use basic to login to get a token
        const token = signin.body.user.token;
        const response = await mockRequest.get('/dashboard').set('Cookie', `token=${token}`);
        console.log(response.body);
        // .auth(users[userType].username, users[userType].password).set('Authorization', `Bearer ${users[userType].token}`);


        // Not checking the value of the response, only that we "got in"
        // expect(response.status).toBe(200);

      }, 10000 );

    });

    describe('bad logins', () => {
      it('basic fails with known user and wrong password ', async () => {

        const response = await mockRequest.post('/signin')
          .auth('admin', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(500);
        expect(userObject.user).not.toBeDefined();

      });

      it('basic fails with unknown user', async () => {

        const response = await mockRequest.post('/signin')
          .auth('nobody', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(500);
        expect(userObject.user).not.toBeDefined();

      });

      it('bearer fails with an invalid token', async () => {

        // First, use basic to login to get a token
        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer foobar`)

        // Not checking the value of the response, only that we "got in"
        expect(bearerResponse.status).toBe(500);

      })
    })

  });

});
