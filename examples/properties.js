var Keen = require('cloud/keen.js');

var keen = Keen.configure({
    projectId: "<project_id>",
    masterKey: "<master_key>"
});
var collection = '<event_collection>';
var property = '<property_name>';

// View a single property info
api.properties.view(projectId, collection, property, function(err, res) {
	console.log('properties.view', err, res);
});

// Removes property for all events in collection
api.properties.remove(projectId, collection, property, function(err, res) {
	console.log('properties.remove', err, res);
});
