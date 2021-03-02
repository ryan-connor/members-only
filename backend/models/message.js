let mongoose = require('mongoose');
let Schema =mongoose.Schema;

let messageSchema = new Schema ({
    content: {type: String},
    datePosted: {type: Date},
    user: {type: Schema.Types.ObjectId, ref: "user" }
});

module.exports = mongoose.model("message", messageSchema);