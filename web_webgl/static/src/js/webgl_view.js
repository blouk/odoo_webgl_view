odoo.define('web_webgl.WebglView', function(require) {
    "use strict";
    var AbstractView = require('web.AbstractView');
    var core = require('web.core');
    var WebglModel = require('web_webgl.WebglModel');
    var WebglRenderer = require('web_webgl.WebglRenderer');
    var WebglController = require('web_webgl.WebglController');
    var view_registry = require('web.view_registry');

    var _t = core._t;
    var _lt = core._lt;

    var WebglView = AbstractView.extend({
        display_name: _lt('Webgl'),
        icon: 'fa-cube',
        config: {
            Model: WebglModel,
            Renderer: WebglRenderer,
            Controller: WebglController
        },

        init: function(viewInfo, params) {
            this._super.apply(this, arguments);
            var arch = viewInfo.arch;
            var fields = viewInfo.fields;

            this.loadParams.fields = _.defaults({
                __count__: {
                    type: ['integer', 'date', 'many2many', 'selection']
                }
            }, fields);
        }
    });

    view_registry.add('webgl', WebglView);
    return WebglView;


});
