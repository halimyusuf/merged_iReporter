const request = require('supertest');

let token;
let server;
describe('Test route records', () => {
  beforeEach(() => {
    server = require('../app');
  });
  afterEach(async () => {
    await server.close();
  });


  // TEST FOR SIGNUP PAGE
  describe('POST api/v1/auth/sign-up', () => {
    let firstname;
    let lastname;
    let othernames;
    let email;
    let phonenumber;
    let username;
    let password;
    const exec = async () => await request(server)
      .post('/api/v1/auth/sign-up')
      .send({
        firstname, lastname, othernames, email, phonenumber, username, password,
      });

    beforeEach(() => {
      firstname = 'halim',
      lastname = 'yusuf',
      othernames = 'olamilekan',
      email = 'haleemyoosuph@gmail.com',
      phonenumber = '07023115003',
      username = 'halimyusuf',
      password = 'halim1234';
    });

    it('return 400 if gmail is not valid', async () => {
      email = 'haleemyoosuph';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('return 400 if firstname is not provided, not type string or min of 3 char', async () => {
      firstname = 'ha';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('return 400 if lastname is not provided, not type string or min of 3 char', async () => {
      lastname = 'ol';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('return 400 if password does not contain min of 5 letters and 1 num', async () => {
      password = 'mypassword';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if othernames is not provided, not type string or min of 3 char', async () => {
      othernames = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 201 if user successfully sign-up', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
      token = res.body.data[0].token;
    });

    it('should return 400 if user try to use an existing email or username', async () => {
      email = 'haleemyoosuph@gmail.com';
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });

  // TEST FOR LOGIN
  describe('POST /api/v1/auth/login', () => {
    let email;
    let password;
    const exec = async () => await request(server)
      .post('/api/v1/auth/login')
      .send({ email, password });

    beforeEach(() => {
      email = 'haleemyoosuph@gmail.com';
      password = 'halim1234';
    });

    it('should return 400 if email is not valid', async () => {
      email = 'haleemyoosuph';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password does not contain min of 5 letters and 1 num ', async () => {
      password = 'haleemyoosuph';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if email does not exist in database', async () => {
      email = 'haleemyoosuph1@gmail.com';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password does not exist in database', async () => {
      password = 'halim113';
      const res = await exec();
      expect(res.status).toBe(400);
    });


    it('should return 200 is user successfully login', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });


  // TEST TO CREATE REDFLAG OR INTERVENTION RECORD
  describe('POST /api/v1/auth/record', () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.
    let title;
    let story;
    let longitude;
    let latitude;
    let type;
    let images;
    let videos;

    const exec = async () => await request(server)
      .post('/api/v1/record')
      .set('x-auth-token', token)
      .send({
        title, story, longitude, latitude, type, images, videos,
      });

    beforeEach(() => {
      title = 'This is the title',
      story = 'This is just the title story i am basically just trynig to make u up to thirty words,i guess this sjould be enough',
      longitude = '2.34',
      latitude = '2.34',
      type = 'Intervention',
      images = 'images.jpg',
      videos = 'videos.mp4';
    });

    it('should return 400 if title is not specified, not type string or less than 10 char', async () => {
      title = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if story is not specified , not type string or less than 30 char', async () => {
      story = 'This is just the title story';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if longitude is not type string or not provided', async () => {
      longitude = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if latitude is not type string or not provided', async () => {
      latitude = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 201 if intervention record has been created', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });

    it('should return 201 if redflag record has been created', async () => {
      type = 'Redflag';
      const res = await exec();
      expect(res.status).toBe(201);
    });
  });


  // GET HOMEPAGE
  describe('GET api/v1/', () => {
    it('get homepage', async () => {
      const res = await request(server).get('/api/v1/');
      expect(res.status).toBe(200);
    });
  });

  // GET ALL USERS INFO
  describe('GET api/v1/users', () => {
    it('return all users records', async () => {
      const res = await request(server).get('/api/v1/users').set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });

  // GET ALL USERS POSTS
  describe('GET api/v1/posts', () => {
    it('passing test to return all users posts', async () => {
      const res = await request(server).get('/api/v1/posts').set('x-auth-token', token);
      expect(res.status).toBe(200);
    });
  });


  // COMMENT PATCH ROUTES
  describe('PATCH api/v1/record/:id/comment', () => {
    let story;
    let record;
    let id;
    const exec = async () => await request(server)
      .patch(`/api/v1/${record}/${id}/comment`)
      .set('x-auth-token', token)
      .send({ story });
    beforeEach(async () => {
      story = 'This is just the title story i am basically just trynig to make u up to thirty words',
      id = 1,
      record = 'interventions';
    });

    it('should return 400 if intervention story is not up to 30 char', async () => {
      story = 'this is a story';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if redflag story is not up to 30 char', async () => {
      record = 'red-flags';
      story = 'this is a story';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 404 if intervention id is invalid', async () => {
      id = 223334444;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if redflag id is invalid', async () => {
      record = 'red-flags';
      id = 773774778;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('passing test- with valid id provided and intervention story more than 30 char', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('passing test- with valid id provided and redflags story more than 30 char', async () => {
      record = 'red-flags';
      id = 2;
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });


  // PATCH LOCATION
  describe('PATCH api/v1/record/:id/location', () => {
    let longitude;
    let latitude;
    let record;
    let id;
    const exec = async () => await request(server)
      .patch(`/api/v1/${record}/${id}/location`)
      .set('x-auth-token', token)
      .send({ longitude, latitude });
    beforeEach(async () => {
      latitude = '1.232',
      longitude = '4.33',
      id = 1,
      record = 'interventions';
    });

    it('should return 404 if intervention id is invalid', async () => {
      id = 223334444;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if redflag id is invalid', async () => {
      record = 'red-flags';
      id = 773774778;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if redflag longitude is not specified or type str', async () => {
      longitude = '';
      record = 'red-flags';
      id = 2;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if redflag latitude is not specified or type str', async () => {
      latitude = '';
      record = 'red-flags';
      id = 2;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if intervention longitude is not specified or type str', async () => {
      longitude = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if intervention latitude is not specified or type str', async () => {
      latitude = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });


    it('should return 200 if intervention location has been patched', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should return 200 if redflag location has been patched', async () => {
      record = 'red-flags';
      id = 2;
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  // PATCH STATUS
  describe('PATCH api/v1/record/:id/status', () => {
    let status;
    let record;
    let id;
    const exec = async () => await request(server)
      .patch(`/api/v1/${record}/${id}/status`)
      .set('x-auth-token', token)
      .send({ status });
    beforeEach(async () => {
      status = 'Resolved',
      id = 1,
      record = 'interventions';
    });

    it('should expect 404 if intervention record cant be found', async () => {
      id = 5466643;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if the intervention status is not Resolved, under investigation, rejected, and Draft', async () => {
      status = 'Change my status';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 200 if intervention status has been successfully patched', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should expect 404 if redflag record cant be found', async () => {
      record = 'red-flags';
      id = 5466643;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if the redflag status is not Resolved, under investigation, rejected, and Draft', async () => {
      status = 'Change my status';
      id = 2;
      record = 'red-flags';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 200 if redflag status has been successfully patched', async () => {
      record = 'red-flags';
      id = 2;
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  // GET SPECIFIC REDFLAG AND INTERVENTION
  describe('GET api/v1/${redflag or intervention}/:id', () => {
    let record;
    let id;
    const exec = async () => await request(server)
      .get(`/api/v1/${record}/${id}`)
      .set('x-auth-token', token);

    beforeEach(() => {
      record = 'interventions',
      id = 1;
    });

    it('should get all inerventions', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should get all redflags', async () => {
      record = 'red-flags';
      id = '';
      const res = await exec();
      expect(res.status).toBe(200);
    });


    it('should return 404 since intervention id is invalid', async () => {
      id = 5566777;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 since redflag id is invalid', async () => {
      record = 'red-flags';
      id = 778889990;
      const res = await exec();
      expect(res.status).toBe(404);
    });


    it('return a specific intervention record', async () => {
      record = 'interventions';
      id = 1;
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('return a specific redflag record', async () => {
      record = 'red-flags';
      id = 2;
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  // TESTS FOR DELETE ROUTES
  describe('DELETE api/v1/record/:id', () => {
    let record;
    let id;
    const exec = async () => await request(server)
      .delete(`/api/v1/${record}/${id}`)
      .set('x-auth-token', token);

    it('should return 404 if intervention id is invalid', async () => {
      record = 'interventions';
      id = 64664474;
      const res = await exec();
      expect(res.status).toBe(404);
    });


    it('should return 404 if redflag id is invalid', async () => {
      record = 'red-flags';
      id = 7575757;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if users id is invalid', async () => {
      record = 'users';
      id = 8796969;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 204 for deleting intervention record successfully', async () => {
      record = 'interventions';
      id = 1;
      const res = await exec();
      expect(res.status).toBe(204);
    });

    it('should return 204 for deleting redflag record successfully', async () => {
      record = 'red-flags';
      id = 2;
      const res = await exec();
      expect(res.status).toBe(204);
    });

    it('should return 204 for deleting user account successfully', async () => {
      record = 'users';
      id = 1;
      const res = await exec();
      expect(res.status).toBe(204);
    });
  });
});
