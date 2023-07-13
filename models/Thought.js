const { Types, model , Schema} = require('mongoose');
const moment = require('moment');
// reaction schema
const reactionSchema = new Schema({
    reactionId :{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280,
    },
    username:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => {
            return moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a');
        },
    }
})
// thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => {
            return moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a');
        },
    },
    username:{
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    
},
{
     toJSON: {
      virtuals: true,
    },
    id: false,
}
);
// virtual to get total count of reactions
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});



const Thought = model('Thought', thoughtSchema);
module.exports = Thought;