var Keen = require('cloud/keen.js');

var keen = Keen.configure({
    projectId: "<project_id>"
    masterKey: "<master_key>"
});

// Get projects list
keen.projects.list(function(err, projects) {
	console.log('projects.list', err, projects);
});

// Get project info
keen.projects.view(projectId, function(err, res) {
	console.log('projects.view', err, res);
});