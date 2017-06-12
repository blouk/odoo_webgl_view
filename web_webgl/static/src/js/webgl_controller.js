odoo.define('web_webgl.WebglController', function(require) {
    "use strict";

    var AbstractController = require('web.AbstractController');
    var core = require('web.core');
    var Dialog = require('web.Dialog');
    var view_dialogs = require('web.view_dialogs');

    var _t = core._t;
    var QWeb = core.qweb;
    var FormViewDialog = view_dialogs.FormViewDialog;

    var WebglController = AbstractController.extend({




        init: function(parent, model, renderer, params) {
            this._super.apply(this, arguments);
            this.renderer.webgl = model.webgl;
        }

    });
    return WebglController;
});
