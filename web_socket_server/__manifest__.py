# -*- coding: utf-8 -*-
{
    'name': 'Web Socket Server',
    'category': 'Extra Tools',
    'description': """
    Web Socket Server
        """,
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'data/data.xml',
        'views/socket_server_view.xml',
    ],
    'qweb': ['static/src/xml/web_socket_dashboard.xml'],
    'installable': True,
    'auto_install': False,
    'application': True,
}
