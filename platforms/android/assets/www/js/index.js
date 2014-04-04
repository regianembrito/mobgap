var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady(), false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
//    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.gotFileSystem, this.fail);
    },

    gotFileSystem: function(fileSystem) {
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, this.gotFileEntry, this.fail);
    },

    gotFileEntry: function(fileEntry) {
        fileEntry.createWriter(this.gotFileWriter, this.fail);
    },
    
    gotFileWriter: function(writer) {
        writer.onwriteend = function(evt) {
        	alert("contents of file now 'some sample text'");
            writer.truncate(11);
            writer.onwriteend = function(evt) {
            	this.showAlert("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                	this.showAlert("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    },
    
    fail: function(error) {
        this.showAlert(error.code);
    },
    
    showAlert: function(msg) {
        navigator.notification.alert(
            msg,  // message
            this.alertDismissed,         // callback
            'MogGat',            // title
            'Done'                  // buttonName
        );
    },
    
    alertDismissed: function() {
        alert('AlertDismissed');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};
