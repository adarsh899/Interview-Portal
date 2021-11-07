const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
    date:
    {
         type: String   
    },
    start_time:
    {
        type: String
    },
    end_time:
    {
        type: String
    },
    // participants:
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User_Collection'
    // },
    

},
{
    timestamps:true
});

const Interview = mongoose.model('Interview_Collection', interviewSchema);
module.exports = Interview;