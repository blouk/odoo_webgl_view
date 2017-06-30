odoo.define('web_socket_settings_dashboard', function(require) {
    'use strict';
    var core = require('web.core');
    var framework = require('web.framework');
    var data = require('web.data');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    var _t = core._t;

    var WebSocketSettingsDashboard = Widget.extend({
        template: 'WebSocketSettingsDashboard',
        events: {
            'click .ws-start': 'start_server',
            'click .ws-stop': 'stop_server',
            'click .ws-clear-console': 'clear_console'
        },
        init: function() {
            return this._super.apply(this, arguments);
        },


        start: function() {
            this.model = new data.DataSet(this, 'web.websocket');
            this.status_server();
            return this._super.apply(this, arguments);
        },
        status_server: function() {
            var self = this;
            this.model.call('status_server', []).done(function(result) {
                if (result === 1) {
                    self.server_opened_status();
                    framework.unblockUI();

                } else if (result === 0) {
                    self.server_closed_status();
                }
            });

        },
        start_server: function(e) {
            var self = this;
            this.model.call('start_server', []).done(function(result) {
                if (result === 1) {
                    self.server_opened_status();

                } else if (result === 0) {
                    self.server_closed_status();
                }
            });
        },
        stop_server: function(e) {
            var self = this;
            this.model.call('stop_server', []).done(function(result) {
                if (result === 1) {
                    self.server_closed_status();

                }
            });

        },
        clear_console: function(e) {
            console.log('clear_console');
            $('#ws_server_status').val('');
        },


        server_opened_status: function() {
            $('.badge-danger').hide();
            $('.badge-success').show();
            $('.ws-stop').show();
            $('.ws-start').hide();
        },

        server_closed_status: function() {
            $('.badge-danger').show();
            $('.badge-success').hide();
            $('.ws-stop').hide();
            $('.ws-start').show();
        }
    });
    core.action_registry.add('web_socket_settings_dashboard.main', WebSocketSettingsDashboard);

    return {
        WebSocketSettingsDashboard: WebSocketSettingsDashboard,

    };
});
