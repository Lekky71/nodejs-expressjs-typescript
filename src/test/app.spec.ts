import request from 'supertest';

import app from '../app';

describe('Testing endpoints', function() {
  it('GET / - Should return 404', function(done) {
    request(app)
      .get('/')
      .expect(404, done);
  });
});
