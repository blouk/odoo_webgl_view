from openerp import _, api, fields, models
from openerp.osv import expression

_WEBGL_VIEW = [('webgl', 'Webgl')]

class View(models.Model):
    _inherit = 'ir.ui.view'
    type = fields.Selection(selection_add=_WEBGL_VIEW)

class ActWindowView(models.Model):
    _inherit = 'ir.actions.act_window.view'
    view_mode = fields.Selection(selection_add=_WEBGL_VIEW)
