
# -*- coding: utf-8 -*-
import signal
import subprocess
import os

from odoo import api, fields, http, models
from odoo.exceptions import AccessError
from odoo.http import request
from odoo import release
from odoo.exceptions import UserError


server = None

class WebSocketSettingsDashboard(http.Controller):

    # to get information routes
    @http.route('/web_socket_settings_dashboard/data', type='json', auth='user')
    def web_socket_settings_dashboard_data(self, **kw):
        if not request.env.user.has_group('base.base.group_system'):
            raise AccessError("Access Denied")



class WebSocketApplication(models.Model):
    #import pudb;pudb.set_trace()
    _name = 'web.websocket'
    # ws_status = request.env['ir.config_parameter'].sudo().get_param('database.uuid')
    @api.model
    def start_server(self):
        global server
        if server:
            raise UserError("The server is already started")
        current_dir = os.path.dirname(os.path.realpath(__file__))
        server_script = os.path.join(current_dir, 'server.py')
        server = subprocess.Popen(['/usr/bin/python', server_script], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print 'start_server'
        return 1

    @api.model
    def stop_server(self):
        global server
        if not server:
            raise UserError("The server is not started")
        server.send_signal(signal.SIGKILL)
        server = None
        print 'stop_server'
        return 1

    @api.model
    def status_server(self):
        # server = Server().start()
        global server
        print 'status_server'
        return 1 if server else 0
