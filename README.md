# Keen IO - Parse Cloud Module

This is a Parse.com Cloud Code Module for the Keen API based on the official Keen [NodeJS Client](https://github.com/keenlabs/KeenClient-Node), check there for the most up to date usage documentation. This port from the NodeJS may be incomplete and is not fully tested.

## Getting Started

Copy `keen.js` to your Parse Cloud Code `cloud` directory

## Examples

### Initialization

```javascript
var Keen = require('cloud/keen.js');

// Configure instance. Only projectId and writeKey are required to send data.
var keen = Keen.configure({
	projectId: "<project_id>",
	writeKey: "<write_key>",
	readKey: "<read_key>",
	masterKey: "<master_key>"
});
```

You can also have multiple instances if you are connecting to multiple KeenIO accounts in the one project (probably edge case).

```javascript
var Keen = require('cloud/keen.js');

// Configure instance with API Key
var keen1 = Keen.configure({...});
var keen2 = Keen.configure({...});
```

In the future there will be the ability to pass options into the initialisation such as batching inserts, etc. The structure of this hasn't been defined yet but will look something like the following.

```javascript
var Keen = require('cloud/keen.js');

// Configure instance with API Key and options
var keen = Keen.configure({ 
	projectId: "<project_id>",
	batchEventInserts: 30 
});
```

### Support for Parse promises

```javascript
//example
var Keen = require('cloud/keen.js');
var keen = Keen.configure({
	projectId: "<project_id>",
	writeKey: "<write_key>"
});

Parse.Cloud.afterSave('Transaction', function(request){
	var keenEvent = {
		total: request.object.get('total');
		//other event properties
	}
	
	keen.addEvent('transactions', keenEvent)
	.then(function(){
		//do something else
	});
});
```

### Send Events

```javascript
var Keen = require('cloud/keen.js');
var keen = Keen.configure({
	projectId: "<project_id>",
	writeKey: "<write_key>"
});

// send single event to Keen IO
keen.addEvent("my event collection", {"property name": "property value"}, function(err, res) {
	if (err) {
		console.log("Oh no, an error!");
	} else {
		console.log("Hooray, it worked!");
	}
});

// send multiple events to Keen IO
keen.addEvents({
	"my first event collection": [{"property name": "property value"}, ...],
	"my second event collection": [{"property name2": "property value 2"}]
}, function(err, res) {
	if (err) {
		console.log("Oh no, an error!");
	} else {
		console.log("Hooray, it worked!");
	}
});
```

### Generate Scoped Key
```javascript
var Keen = require('cloud/keen.js');
var apiKey = "YOUR_API_KEY";
var scopedKey = Keen.encryptScopedKey(apiKey, {
	"allowed_operations": ["read"],
	"filters": [{
		"property_name": "account.id",
		"operator": "eq",
		"property_value": "123"
	}]
});
var keen = Keen.configure({
	projectId: "<project_id>";
	readKey: scopedKey
});
```

## Contributing

Hit me up with pull requests and issues.


## Further Reading

[Keen IO - NodeJS Client](https://github.com/keenlabs/KeenClient-Node)

[Keen IO - Website](https://keen.io/)

[Keen IO - API Technical Reference](https://keen.io/docs/api/reference/)

## License

Licensed under the MIT license.
