const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required in UserSchema.']
  },
  posts: [PostSchema],
  likes: Number
});

UserSchema.virtual('postCount').get(function() { // use function instead of fat arrow
    return this.posts.length;
})
const User = mongoose.model('user', UserSchema);

module.exports = User;