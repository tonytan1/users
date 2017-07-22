const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('require a user name', (done) => {
        const user = new User({ name: undefined});
        // const validationResult = user.validateSync();
        user.validate((validationResult) => {
            const { message } = validationResult.errors.name;
            assert(message === "Name is required in UserSchema.");
            done();
        })
    });

    it('require username longer than 2 characters', (done) => {
        const user = new User({ name: 'Al'});
        user.validate((validationResult) => {
            const { message } = validationResult.errors.name;
            assert(message === "Name must be longer than 2 characters.");
            done();
        })
    });

    it('disallow invalid records from being save', (done) => {
        const user = new User({ name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message  === "Name must be longer than 2 characters.");
                done();
            })

    });
});