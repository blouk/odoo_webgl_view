# -*- coding: utf-8 -*-

{
    'name': 'Test',
    'category': 'Hidden',
    'description': """
    Webgl view data
        """,
    'depends': ['web'],
    'data': [
        'views/webgl_view.xml',
        'views/asset_backend.xml',
    ],
    'qweb': ['static/src/xml/base_view.xml'],
    'demo': [
    ],
    'application': True,
}
