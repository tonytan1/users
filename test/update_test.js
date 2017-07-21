const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => {
                done();
            })
    });

    function assertName(operation, done) {
        operation.then(() => {
            User.find({
                    name: 'Alex'
                })
                .then((users) => {
                    assert(users.length === 1);
                    assert(users[0].name === 'Alex');
                    done();
                })
        })
    }
    /**
     * model instance update
     */
    it('model instance type set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(joe.update({
            name: 'Alex'
        }), done);
    });

    /**
     * model class update
     */

    it('A model class can update', (done) => {
        assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);
    });

    it('A model class can update one record', (done) => {
        assertName(User.findOneAndUpdate({
            name: 'Joe',
        }, {
            name: 'Alex'
        }), done);
    });

    it('A model class can find a record and update by id', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {
            name: 'Alex'
        }), done);
    })
});