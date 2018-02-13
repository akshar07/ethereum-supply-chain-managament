// const app=require('../server');
// const request=require('supertest');
// const expect=require('chai').expect;


// describe('manafacturer add car',function(){
//     it('should add a car and return name number and address',(done)=>{
//         request(app)
//         .post('/manafacturer/addCar')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end((err,resp)=>{
//             expect(resp.name).to.be.a(string);
//             expect(resp.carNumber).to.be.a(string);
//             expect(resp.senderAdd).to.be.a(string);
//             done();
//         });
//     });
// });

// describe('manafacturere get car',()=>{
//     it('should get the car corresponding to Id',(done)=>{
//         request(app)
//         .get('manafacturer/getCar')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end((err,resp)=>{
//             expect(resp.name).to.be.a(string);
//             expect(resp.number).to.be.a(string);
//             done();
//         })
//     })
// })