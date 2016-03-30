describe('Example Test', function() {
    describe('This should work', function() {
        const array = [1, 2, 3];
        it('Should contain 1', function() {
            array.indexOf(1).should.equal(0);
        });
        it('Should contain 2', function() {
            array.indexOf(2).should.equal(1);
        });
        it('Should contain 3', function() {
            array.indexOf(3).should.equal(2);
        });
        it('Should not contain 4', function() {
            array.indexOf(4).should.equal(-1);
        });
    });
});
