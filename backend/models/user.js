let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema( {
    username: {type: String, required: true},
    password: {type: String},
    privilege: {type: String}
});

module.exports = mongoose.model('user', userSchema);