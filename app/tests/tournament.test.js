const app = require("../../index");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-http"));
chai.use(require('chai-like'));
chai.use(require('chai-things'));


describe("App Running!", () => {

    it("Get Tournaments", done => {
        let bodyexpeted = {
            name: "tournament1",
            type: "clasification",
        }
        chai
          .request(app)
          .get(BASE_API_PATH+'/tournaments')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.contain.something.like(bodyexpeted)
            done();
          });
      });



})