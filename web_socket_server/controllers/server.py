#!/usr/bin/env python
# -*- coding: utf-8 -*-
import gevent.monkey
gevent.monkey.patch_all()
import psycogreen.gevent
psycogreen.gevent.patch_psycopg()
from geventwebsocket import WebSocketServer, WebSocketApplication, Resource

import sys

# TODO: receive those variables through args
DBNAME = 'socket'
PORT = 8000
ODOO_PATH = '/home/odoo/Documents/workspace/odoo'

sys.path.append(ODOO_PATH)


import odoo
from odoo.tools import config

config.parse_config([])
odoo.cli.server.report_configuration()
odoo.service.server.start(preload=[], stop=True)



class EchoApplication(WebSocketApplication):
    def on_open(self):
        print "Connection opened"
        with odoo.api.Environment.manage():
            self.registry = odoo.registry(DBNAME)

    def on_message(self, message):
        with odoo.api.Environment.manage():
            with self.registry.cursor() as cr:
                uid = odoo.SUPERUSER_ID
                ctx = odoo.api.Environment(cr, uid, {})['res.users'].context_get()
                env = odoo.api.Environment(cr, uid, ctx)
                try:
                    # ICI TU MET TON CODE
                    msg = env['res.users'].browse(1).name
                    self.ws.send(msg)
                except Exception:
                    cr.rollback()
                    self.ws.send("ERROR")

    def on_close(self, reason):
        print(reason)


WebSocketServer(
    ('', PORT),
    Resource({'/': EchoApplication})
).serve_forever()
