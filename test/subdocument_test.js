const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a Subdocument', (done) => {
        let postTitle = 'this is post title';
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: postTitle
            }]
        });

        joe.save()
            .then(() => {
                User.findOne({
                        name: 'Joe'
                    })
                    .then((user) => {
                        assert(user.posts[0].title === postTitle);
                        done();
                    })
            })
    });

    it('Can add subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                user.posts.push({
                    title: 'New Post'
                })
                return user.save();
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'New Title'}]
        });

        joe.save()
        .then((user) => {
            const post = user.posts[0];
            post.remove();
            return user.save();
        })
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) =>{
            assert(user.posts.length === 0);
            done();
        });
    });
});