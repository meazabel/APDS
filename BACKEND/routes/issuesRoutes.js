const Issue = require('../modules/issue');
const checkauth = require('../check-auth');
const express = require('express');
const router = express.Router();

// View all issues
router.get('/all-issues', checkauth, (req, res) => {
    Issue.find().then((issues) => {
        res.json(
            {
                message: 'issues found',
                issues: issues
            }
        )
    })
})

// Update an issue
router.put('/update-issue/:id', checkauth, async (req, res) => {
    try {
        const issueId = req.params.id;
        const updatedIssue = await Issue.findByIdAndUpdate(
            issueId,
            {status: req.body.status},
            {new: true}
        );
        if (!updatedIssue) {
            return res.status(404).json({message: 'Issue not found'});
        }
        res.json({message: 'Issue updated successfully', updatedIssue});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


// Delete an issue
router.delete('/delete-issue/:id', checkauth, (req, res) => {
    if (!req.userData.isAdmin) {
        return res.status(403).json({message: 'Permission denied'});
    } else {
        Issue.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(200).json({message: "Issue deleted" + result})
            });
    }
})

// New issue
router.post('/add-issue', (req, res) => {
    const {title, description, status} = req.body;

    const newIssue = new Issue({
        title,
        description,
        status,
    });
    newIssue
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'Issue created successfully',
                issue: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message,
            });
        });
});

module.exports = router;