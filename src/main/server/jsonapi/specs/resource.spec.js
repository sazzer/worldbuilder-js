import {Resource} from '../resource';

describe('Resource', function() {
    describe('Bare Minimum', function() {
        const resource = new Resource('users', 1);
        const built = resource.build();
        it('Should have data', function() {
            built.should.have.property('data').and.have.keys('type', 'id');
        });
        it('Should have the correct type', function() {
            built.should.have.deep.property('data.type', 'users');
        });
        it('Should have the correct ID', function() {
            built.should.have.deep.property('data.id', 1);
        });
        it('Should have no links', function() {
            built.should.not.have.property('links');
        });
        it('Should have no attributes', function() {
            built.should.not.have.deep.property('data.attributes');
        });
        it('Should have no relationships', function() {
            built.should.not.have.deep.property('data.relationships');
        });
    });

    describe('With Links', function() {
        const resource = new Resource('users', 1);
        resource.addLink('self', '/a/b/c');

        const built = resource.build();
        it('Should have data', function() {
            built.should.have.property('data').and.have.keys('type', 'id');
        });
        it('Should have the correct type', function() {
            built.should.have.deep.property('data.type', 'users');
        });
        it('Should have the correct ID', function() {
            built.should.have.deep.property('data.id', 1);
        });
        it('Should have links', function() {
            built.should.have.deep.property('links.self', '/a/b/c');
        });
        it('Should have no attributes', function() {
            built.should.not.have.deep.property('data.attributes');
        });
        it('Should have no relationships', function() {
            built.should.not.have.deep.property('data.relationships');
        });
    });

    describe('With Attributes', function() {
        const resource = new Resource('users', 1);
        resource.addAttribute('name', 'Graham');
        resource.addAttribute('answer', 42);
        resource.addAttribute('primes', [2, 3, 5, 7]);
        const built = resource.build();
        it('Should have data', function() {
            built.should.have.property('data').and.have.keys('type', 'id', 'attributes');
        });
        it('Should have the correct type', function() {
            built.should.have.deep.property('data.type', 'users');
        });
        it('Should have the correct ID', function() {
            built.should.have.deep.property('data.id', 1);
        });
        it('Should have no links', function() {
            built.should.not.have.property('links');
        });
        it('Should have attributes', function() {
            built.should.have.deep.property('data.attributes');
            built.should.have.deep.property('data.attributes.name', 'Graham');
            built.should.have.deep.property('data.attributes.answer', 42);
            built.should.have.deep.property('data.attributes.primes').eql([2, 3, 5, 7]);
        });
        it('Should have no relationships', function() {
            built.should.not.have.deep.property('data.relationships');
        });
    });

    describe('With a Relationship', function() {
        const resource = new Resource('posts', 1);
        resource.addRelationship('owner', 'users', 5);

        const built = resource.build();
        it('Should have data', function() {
            built.should.have.property('data').and.have.keys('type', 'id', 'relationships');
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
        it('Should have no attributes', function() {
            built.should.not.have.deep.property('data.attributes');
        });
        it('Should have relationships', function() {
            built.should.have.deep.property('data.relationships');
            built.should.have.deep.property('data.relationships.owner.data.type', 'users');
            built.should.have.deep.property('data.relationships.owner.data.id', 5);
        });
    });
});
