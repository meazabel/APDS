const mongoose = require('mongoose');

// Define the schema for the issue model
const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open',
    },
});

// Export the model
module.exports = mongoose.model('Issue', issueSchema)