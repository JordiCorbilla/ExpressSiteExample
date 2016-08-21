/*!
 * Source code from StackOverflow
 * http://stackoverflow.com/questions/4282151/is-it-possible-to-ping-a-server-from-javascript
 * 
 */

function ping(ip, callback) {

    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('ONLINE');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('ONLINE', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1500);
    }
}
var PingModel = function (servers) {
    var self = this;
    var myServers = [];
    ko.utils.arrayForEach(servers, function (location) {
        myServers.push({
            name: location,
            status: ko.observable('PENDING')
        });
    });
    self.servers = ko.observableArray(myServers);
    ko.utils.arrayForEach(self.servers(), function (s) {
        s.status('CONTACTING');
        new ping(s.name, function (status, e) {
            s.status(status);
        });
    });
};
var komodel = new PingModel([
    'piController',
    'pi01',
    'pi02',
    'pi03'
    ]);
ko.applyBindings(komodel);