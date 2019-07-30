// const Request = require('request');


// var  token = []
// describe('Test route records', () => {
//   let server;
//   beforeAll(() => {
//     server = require('../app');
//   });
//   afterAll(() => {
//     server.close();
//   });

//   // ALL POSTS REQUESTS


//   // POSTS REQUESTS FOR USERS RECORDS
//   describe('test for email', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/auth/sign-up', {
//         form:
//         {
//           firstname: 'halim',
// 				  lastname: 'yusuf',
// 				  othernames: 'olamilekan',
// 				  email: 'haleemyoosuph',
// 				  phonenumber: '07023115003',
//           username: 'halimyusuf1',
//           password: 'halim1234'
//         },
//       }, (error, response, body) => {
//         status = response.statusCode;
//         done();
//       });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });

//   describe('test if firstname is not type string or min of 3 char', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/auth/sign-up', {
//         form:
//         {
//           firstname: 'h',
// 				  lastname: 'yusuf',
// 				  othernames: 'olamilekan',
// 				  email: 'haleemyoosuph@gmail.com',
// 				  phonenumber: '07023115003',
//           username: 'halimyusuf1',
//           password: 'halim1234'
//         },
//       }, (error, response, body) => {
//         status = response.statusCode;
//         done();
//       });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('test if lastname to be type string or min of 3 char', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/auth/sign-up', {
//         form:
//         {
//           firstname: 'halim',
// 				  lastname: 'yusuf',
// 				  othernames: 'o',
// 				  email: 'haleemyoosuph5@gmail.com',
// 				  phonenumber: '07023115003',
//           username: 'halimyusuf5',
//           password: 'halim1234'
//         },
//       }, (error, response, body) => {
//         status = response.statusCode;
//         done();
//       });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('POST api/v1/auth/signup', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/auth/sign-up', {
//         form:
// 				{
// 				  firstname: 'halim',
// 				  lastname: 'yusuf',
// 				  othernames: 'olamilekan',
// 				  email: 'haleemyoosuph1@gmail.com',
// 				  phonenumber: '07023115003',
//           username: 'halimyusuf1',
//           password: 'halim1234'
// 				},
//       }, (error, response, body) => {
//         status = response.statusCode;
//         _body = JSON.parse(body)
//         done();
//       });
//     });
//     it('status 201', () => {
//       expect(status).toBe(201);
//       token = _body.data[0].token
//     });
    
//   });



//   // POST REQUESTS FOR INTERVENTIONS and REDFLAG

//   describe('should return 400 if title is not specified,not type string and length is less than 3 ', () => {
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/record',{
//         headers: {
//           'x-auth-token': token
//         }
//       },
//         {
//           form: {
//               title: 6,
// 					    story: 'This is just the title stiory i am basically just trynig to make u up to thirty words,i guess this sjould be enough',
//               longitude: '2.34',
//               latitude: '2.34',
//               type: 'Intervention',
//               images: 'images.jpg',
//               videos: 'videos.mp4'
//           },
          
//         },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('should return 400 if story is not specified,not type string and length is less than 30 ', () => {
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/record',{
//         headers: {
//           'x-auth-token': token
//         }
//       },
//         {
//           form: {
//               title: 'This is the title',
// 					    story: 'This is just the title stiory                                                                     ',
//               longitude: '2.34',
//               latitude: '2.34',
//               type: 'Intervention',
//               images: 'images.jpg',
//               videos: 'videos.mp4'  
//           },
//         },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('should return 400 if longitude is not specified,not type \'string\' and length is less than 1 ', () => {
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/record',{
//         headers: {
//           'x-auth-token': token
//         }
//       },
//         {
//           form: {
//               title: 'This is the title',
// 					    story: 'This is just the title stiory i am basically just trynig to make u up to thirty words,i guess this sjould be enough',
//               longitude: '',
//               latitude: '2.34',
//               type: 'Intervention',
//               images: 'images.jpg',
//               videos: 'videos.mp4'
//           },
//         },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('should return 400 if latitude is not specified,not type \'string\' and length is less than 1', () => {
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/record',{
//         headers: {
//           'x-auth-token': token
//         }
//       },
//         {
//           form: {
//               title: 'This is the title',
// 					    story: 'This is just the title stiory i am basically just trynig to make u up to thirty words,i guess this sjould be enough',
//               longitude: '2.34',
//               latitude: '',
//               type: 'Intervention',
//               images: 'images.jpg',
//               videos: 'videos.mp4'
//           },
//         },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });
  

//   describe('Failing test if type is not intervention or red-flag', () => {
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/record',{
//         headers: {
//           'x-auth-token': token
//         }
//       },
//         {
//           form: {
//               title: 'This is the title',
// 					    story: 'This is just the title stiory i am basically just trynig to make u up to thirty words,i guess this sjould be enough',
//               longitude: '2.34',
//               latitude: '2.34',
//               type: 'Intern',
//               images: 'images.jpg',
//               videos: 'videos.mp4'
//           },
//         },
// 				 (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('Testing post request to create interventions', () => {
    
//     const form = {
//           title: 'This is the title',
//           story: 'This is just the title stiory i am basically just trynig to make u up to thirty words,i guess this sjould be enough',
//           longitude: '2.34',
//           latitude: '2.34',
//           type: 'Intervention',
//           images: 'images.jpg',
//           videos: 'videos.mp4'
//       }
     
//     const formData = JSON.stringify(form)
//     // const options = {
//     //   url: 'http://localhost:3000/api/v1/record',
//     //   method: 'POST',
//     //   headers: {
//     //     'x-auth-token': token
//     //   },
      
//     // }
//     beforeAll((done) =>
//     {
//       Request({
//         headers: {
//           'x-auth-token': token
//         },
//         uri: 'http://localhost:3000/api/v1/record',
//         method: 'POST',
//         body: formData
//       },
// 				 (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 201', () => {
//       expect(status).toBe(201);
//     });
//     it('message',() => {
//       expect(_body).toBe('message')
//     });
//   });

  
//   describe('Testing post request to create red-flags', () => {
//     beforeAll((done) => {
//       Request.post('http://localhost:3000/api/v1/record',{
//         headers: {
//           'x-auth-token': token
//         }
//       },
//         {
//           form: {
//               title: 'This is the title',
// 					    story: 'This is just the title stiory i am basically just trynig to make u up to thirty words,i guess this sjould be enough',
//               longitude: '2.34',
//               latitude: '2.34',
//               type: 'Redflag',
//               images: 'images.jpg',
//               videos: 'videos.mp4'
//           },
//         },
// 				 (error, response, body) => {
//           status = response.statusCode;
//           _body = JSON.parse(body)
//           done();
//         });
//     });
//     it('status 201', () => {
//       expect(status).toBe(201);
//     });
//     it('message',() => {
//       expect(_body).toBe('message')
//     });
//   });



//   // ALL GET REQUESTS

//   // GET HOMEPAGE
//   describe('GET / ', () => {
//     beforeAll((done) => {
//       Request.get('http://localhost:3000/api/v1' ,(error, response, body) => {
//         status = response.statusCode;
//         _body = JSON.parse(body)
//         done()
//       });
//     });
//     it('status 200', () => {
//       expect(status).toBe(200)
//     })
//     it('body should be type string', () => {
//       expect(typeof _body).toBe('object')
//     })
//   })

//   // GET REQUESTS FOR RED-FLAGS

  
//   describe('Failing test if id is invalid',() => {
//     const data = {}
//     beforeAll((done) => {
//       Request.get('http://localhost:3000/api/v1/red-flags/1000',(error,response,body) => {
//         data.status = response.statusCode
//       })
//       done()
//     })
//     it('status 404', () => {
//       expect(data.status).toBe(404)
//     })
//   })


//   describe('GET /red-flags', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.get('http://localhost:3000/api/v1/red-flags', (error, response, body) => {
//         data.status = response.statusCode;
//         data.body = JSON.parse(body);
//         done();
//       });
//     });
//     it('status 200', () => {
//       expect(data.status).toBe(200);
//     });
//     it('test for id type to be a number', () => {
//       expect(typeof data.body.data[0].id).toBe('number');
//     });
//     it('test for post type to be a string', () => {
//       expect(typeof data.body.data[0].type).toBe('string');
//     });
//     it('test for location type to be a string', () => {
//       expect(typeof data.body.data[0].longitude).toBe('string');
//     });
//     it('test for location type to be a string', () => {
//       expect(typeof data.body.data[0].latitude).toBe('string');
//     });
//     it('test for comment type to be a string', () => {
//       expect(typeof data.body.data[0].story).toBe('string');
//     });
//     it('test for status type to be a string', () => {
//       expect(typeof data.body.data[0].status).toBe('string');
//     });
//   });


//   describe('GET specific red-flag records', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.get('http://localhost:3000/api/v1/red-flags/2', (error, response, body) => {
//         data.status = response.statusCode;
//         data.body = JSON.parse(body);
//         done();
//       });
//     });
//     it('status 200', () => {
//       expect(data.status).toBe(200);
//     });
//     it('test for id type to be a number', () => {
//       expect(typeof data.body.data[0].id).toBe('number');
//     });
//     it('test for post type to be a string', () => {
//       expect(typeof data.body.data[0].type).toBe('string');
//     });
//     it('test for longitude type to be a string', () => {
//       expect(typeof data.body.data[0].longitude).toBe('string');
//     });
//     it('test for latitude type to be a string', () => {
//       expect(typeof data.body.data[0].latitude).toBe('string');
//     });
//     it('test for story type to be a string', () => {
//       expect(typeof data.body.data[0].story).toBe('string');
//     });
//     it('test for title type to be a string', () => {
//       expect(typeof data.body.data[0].title).toBe('string');
//     });
//     it('test for status type to be a string', () => {
//       expect(typeof data.body.data[0].status).toBe('string');
//     });
//   });


//   // GET REQUESTS FOR INTERVENTIONS

//   describe('Failing test if id is invalid',() => {
//     const data = {}
//     beforeAll((done) => {
//       Request.get('http://localhost:3000/api/v1/interventions/1000',(error,response,body) => {
//         data.status = response.statusCode
//       })
//       done()
//     })
//     it('status 404', () => {
//       expect(data.status).toBe(404);
//     })
//   })
  
//   describe('GET /interventions', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.get('http://localhost:3000/api/v1/interventions', (error, response, body) => {
//         data.status = response.statusCode;
//         data.body = JSON.parse(body);
//         done();
//       });
//     });
//     it('status 200', () => {
//       expect(data.status).toBe(200);
//     });
//     it('test for id type to be a number', () => {
//       expect(typeof data.body.data[0].id).toBe('number');
//     });
//     it('test for post type to be a string', () => {
//       expect(typeof data.body.data[0].type).toBe('string');
//     });
//     it('test for location type to be a string', () => {
//       expect(typeof data.body.data[0].longitude).toBe('string');
//     });
//     it('test for location type to be a string', () => {
//       expect(typeof data.body.data[0].latitude).toBe('string');
//     });
//     it('test for comment type to be a string', () => {
//       expect(typeof data.body.data[0].story).toBe('string');
//     });
//     it('test for status type to be a string', () => {
//       expect(typeof data.body.data[0].status).toBe('string');
//     });
//   });


//   describe('GET specific intervention record', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.get('http://localhost:3000/api/v1/interventions/1', (error, response, body) => {
//         data.status = response.statusCode;
//         data.body = JSON.parse(body);
//         done();
//       });
//     });
//     it('status 200', () => {
//       expect(data.status).toBe(200);
//     });
//     it('test for id type to be a number', () => {
//       expect(typeof data.body.data[0].id).toBe('number');
//     });
//     it('test for post type to be a string', () => {
//       expect(typeof data.body.data[0].type).toBe('string');
//     });
//     it('test for longitude type to be a string', () => {
//       expect(typeof data.body.data[0].longitude).toBe('string');
//     });
//     it('test for latitude type to be a string', () => {
//       expect(typeof data.body.data[0].latitude).toBe('string');
//     });
//     it('test for story type to be a string', () => {
//       expect(typeof data.body.data[0].story).toBe('string');
//     });
//     it('test for title type to be a string', () => {
//       expect(typeof data.body.data[0].title).toBe('string');
//     });
//     it('test for status type to be a string', () => {
//       expect(typeof data.body.data[0].status).toBe('string');
//     });
//   });



  
//   // ALL PATCH REQUESTS
  
//   // PATCH REQUESTS FOR RED-FLAGS
//   describe('should return 400 if comment is not specified or lenght is not up to 30', () => {
//     beforeAll((done) => { 
//       Request.patch('http://localhost:3000/api/v1/red-flags/2/comment',
//         { form: { story: '' } },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('should return 400 if longitude is not specified or not type string', () => {
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/red-flags/2/location',
//         { form: { longitude: '' ,latitude:'65.22' } },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('should return 400 if latitude is not specified or not type string', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/red-flags/2/location/',
//         { form: { longitude: '30.23' ,latitude:'' } },
//         (error, response, body) => {
//           data.status = response.statusCode;
//           data.body = JSON.parse(body);
//           done();
//         });
//     });
//     it('status 400', () => {
//       expect(data.status).toBe(400);
//     });
//   });


//   describe('expects status 200 if story has been successfully updated', () => {
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/red-flags/2/comment',
//         { form: { story: 'This is a patched story i am only adding more because i want to make up to thirty characters!' } },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 200', () => {
//       expect(status).toBe(200);
//     });
//   });




//   describe('api/v1/red-flags/1/location', () => {
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/red-flags/2/location',
//         { form: { longitude: '30.23' ,latitude: '65.22' } },
// 				 (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 200 if location has been updated successfully', () => {
//       expect(status).toBe(200);
//     });
//   });


//   // PATCH REQUESTS FOR INTERVENTIONS


//   describe('api/v1/interventions/1000/location', () => {
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/interventions/1000/location',{form: { longitude: '6',latitude:'7' } }, (error,response,body) => {
//         status = response.statusCode
//       });
//       done();
//     });
//     it('status 404 if record can\'t be found' ,() => {
//       expect(status).toBe(404);
//     });
//   });

//   describe('api/v1/interventions/1/comment', () => {
//     beforeAll((done) => { 
//       Request.patch('http://localhost:3000/api/v1/interventions/1/comment',
//         { form: { story: '' } },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('should return 400 if comment is not specified or lenght is not up to 30', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('api/v1/interventions/1/location', () => {
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/interventions/1/location',
//         { form: { longitude: '' ,latitude:'65.22' } },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('should return 400 if longitude is not specified or not type string', () => {
//       expect(status).toBe(400);
//     });
//   });


//   describe('api/v1/interventions/1/location', () => {
//     const data = {};
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/interventions/1/location/',
//         { form: { longitude: '30.23' ,latitude:'' } },
//         (error, response, body) => {
//           data.status = response.statusCode;
//           data.body = JSON.parse(body);
//           done();
//         });
//     });
//     it('should return 400 if latitude is not specified or not type string', () => {
//       expect(data.status).toBe(400);
//     });
//   });


//   describe('api/v1/interventions/1/comment', () => {
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/interventions/1/comment',
//         { form: { story: 'This is a patched story i am only adding more because i want to make up to thirty characters!' } },
//         (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('expects status 200 if story has been successfully updated', () => {
//       expect(status).toBe(200);
//     });
//   });




//   describe('api/v1/interventions/1/location', () => {
//     beforeAll((done) => {
//       Request.patch('http://localhost:3000/api/v1/interventions/1/location',
//         { form: { longitude: '30.23' ,latitude: '65.22' } },
// 				 (error, response, body) => {
//           status = response.statusCode;
//           done();
//         });
//     });
//     it('status 200 if location has been successfully updated', () => {
//       expect(status).toBe(200);
//     });
//   });


  

  
//   // DELETE REQUESTS
//   describe('delete /- Failing test if \'id\' is invalid', () => {
//     beforeAll((done) => {
//       Request.delete('http://localhost:3000/api/v1/red-flags/10' ,(error, response, body) => {
//         status = response.statusCode;
//         _body = body
//         done()
//       });
//     });
//     it('status 404', () => {
//       expect(status).toBe(404)
//     })
//     it('test to receive a message', () => {
//       expect(_body).toMatch('Redflag not found')
//     })
//   })  



//   describe('delete / ', () => {
//     beforeAll((done) => {
//       Request.delete('http://localhost:3000/api/v1/red-flags/5' ,(error, response, body) => {
//         status = response.statusCode;
//         _body = JSON.parse(body)
//         done()
//       });
//     });
//     it('status 200', () => {
//       expect(status).toBe(200)
//     })
//     it('test to receive a message', () => {
//       expect(_body.data[0].message).toMatch('red_flag record has been deleted')
//     })
//   })

//   describe('delete / ', () => {
//     beforeAll((done) => {
//       Request.delete('http://localhost:3000/api/v1/interventions/4' ,(error, response, body) => {
//         status = response.statusCode;
//         _body = JSON.parse(body)
//         done()
//       });
//     });
//     it('status 200', () => {
//       expect(status).toBe(200)
//     })
//     it('test to receive a message', () => {
//       expect(_body.data[0].message).toMatch('intervention record has been deleted')
//     })
//   })




// });

