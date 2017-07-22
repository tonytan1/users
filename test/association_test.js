const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => { // data setup
        joe = new User({
            name: 'Joe'
        });
        blogPost = new BlogPost({
            title: 'JS is great!',
            content: 'yes, it is great.'
        });
        comment = new Comment({
            content: 'Congrats on great post!'
        });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([ //parallel
            joe.save(),
            blogPost.save(),
            comment.save()
        ]).then(() => done());
    });

    it('saves a relation between user and blogpost', (done) => {
        User.findOne({
                name: 'Joe'
            })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is great!');
                done();
            })
    });

    it('saves a full relation tree', (done) => {
        User.findOne({
                name: 'Joe'
            })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is great!');
                assert(user.blogPosts[0].content === 'yes, it is great.');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post!');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe')
                done();
            })
    });
});