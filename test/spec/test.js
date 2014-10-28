/* global describe, it */

(function () {
  'use strict';

  describe('A Task Object', function () {

    var task;

    beforeEach(function() {
      task = new Task();
    });

    describe('Task Creation', function () {

      it('should be an instance of Task', function() {
        expect(task).to.be.an.instanceof(Task);
      });

    });

    describe('Task Properties', function (){

      it('should have a default status', function() {
        expect(task.status).to.equal('incomplete');
      });

      it('should overwrite status', function () {
        task.status = 'complete';
        expect(task.status).to.equal('complete');
      });


    });

  });

})();
