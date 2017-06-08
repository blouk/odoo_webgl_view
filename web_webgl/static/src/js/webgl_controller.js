odoo.define('web_webgl.WebglController', function(require) {
    "use strict";

    var AbstractController = require('web.AbstractController');
    var core = require('web.core');
    var Dialog = require('web.Dialog');
    var view_dialogs = require('web.view_dialogs');

    var _t = core._t;
    var QWeb = core.qweb;
    var FormViewDialog = view_dialogs.FormViewDialog;

    /**
     * Diagram Controller
     */
    var WebglController = AbstractController.extend({

        custom_events: {

        },

        init: function(parent, model, renderer, params) {
            console.log('controller')
            this._super.apply(this, arguments);
            this.renderer.webgl = model.webgl;
        }
    });
    return WebglController;
});
