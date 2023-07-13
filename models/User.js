const {model, Schema} = require('mongoose');
// user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    
    },
    {
        toJSON: {
      virtuals: true,
    },
    id: false,
    }
    );

userSchema.virtual('friendCount')
    .get(function(){
    return this.friends.length;
})

const User = model('User', userSchema);
module.exports = User;