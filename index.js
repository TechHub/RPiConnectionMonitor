var mandrill = require('mandrill-api/mandrill');
var mandrillApiKey = process.env.MANDRILL;
var mandrill_client = new mandrill.Mandrill(mandrillApiKey);

var now;

var message = {
    "text": "There was a disconnection",
    "subject": "THS Internet Monitor - Disconnection",
    "from_email": "it@techhub.com",
    "from_name": "THS Internet Monitor",
    "to": [{
        "email": "mattia.asti@techhub.com",
        "name": "Mattia",
        "type": "to"
    }, {
        "email": "jonathan.liefman@techhub.com",
        "name": "Jono",
        "type": "to"
    }]
};

function checkInternet(cb) {
    require('dns').lookup('google.com', function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

setInterval(function() {
    checkInternet(function(isConnected) {
        if (!isConnected) {
            // not connected to the internet
            console.log('Internet is down');

            now = new Date().toString();
            message.html = "<h3>TechHub Shoreditch internet monitor</h3><p>There was a disconnection at <br>" + now + "</p>";

            // disconnected, send an email
            mandrill_client.messages.send({
                "message": message,
                "async": true
            }, function(result) {
                console.log(result);
            }, function(e) {
                console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            });
            console.log('internet down!');
        }
    });
}, 30000);
