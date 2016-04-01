import {Relationship} from '../relationship';

describe('Relationship', function() {
    describe('Without links', function() {
        const relationship = new Relationship('posts', 1);
        const built = relationship.build();
        it('Should have data', function() {
            built.should.have.property('data').and.have.keys('type', 'id');
        });
        it('Should have the correct type', function() {
            built.should.have.deep.property('data.type', 'posts');
        });
        it('Should have the correct ID', function() {
            built.should.have.deep.property('data.id', 1);
        });
        it('Should have no links', function() {
            built.should.not.have.property('links');
        });
    });
    
    describe('With related link', function() {
        const relationship = new Relationship('worlds', 1);
        relationship.setRelated('/1/2/3');
        
        const built = relationship.build();
        it('Should have data', function() {
            built.should.have.property('data').and.have.keys('type', 'id');
        });
        it('Should have the correct type', function() {
            built.should.have.deep.property('data.type', 'worlds');
        });
        it('Should have the correct ID', function() {
            built.should.have.deep.property('data.id', 1);
        });
        it('Should have links', function() {
            built.should.have.property('links').and.have.keys('related');
        });
        it('Should have the correct Related Link', function() {
            built.should.have.deep.property('links.related', '/1/2/3');
        });
    });
    
    describe('With all links', function() {
        const relationship = new Relationship('posts', 1);
        relationship.setSelf('/a/b/c');
        relationship.setRelated('/1/2/3');
        
        const built = relationship.build();
        it('Should have data', function() {
            built.should.have.property('data').and.have.keys('type', 'id');
        });
        it('Should have the correct type', function() {
            built.should.have.deep.property('data.type', 'posts');
        });
        it('Should have the correct ID', function() {
            built.should.have.deep.property('data.id', 1);
        });
        it('Should have links', function() {
            built.should.have.property('links').and.have.keys('self', 'related');
        });
        it('Should have the correct Self Link', function() {
            built.should.have.deep.property('links.self', '/a/b/c');
        });
        it('Should have the correct Related Link', function() {
            built.should.have.deep.property('links.related', '/1/2/3');
        });
    });
});
