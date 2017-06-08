odoo.define('web_webgl.WebglModel', function(require) {
    "use strict";

    var AbstractModel = require('web.AbstractModel');

    var WebglModel = AbstractModel.extend({
        init: function() {
            this._super.apply(this, arguments);
            this.webgl = null;
        },
        get: function() {
            return _.extend({}, this.gantt);
        },
        load: function(params) {

            this.modelName = params.modelName;
            this.fields = params.fields;
            this.groupBy = params.groupBy;
            this.fields = params.fields;
            this.webgl = {
                fields: this.fields,
                domain: params.domain || [],
                context: params.context || {},
            };
            return this._load_data();
        },
        reload: function(handle, params) {

            if (params.domain) {
                this.webgl.domain = params.domain;
            }
            if (params.context) {
                this.webgl.context = params.context;
            }

            return this._load_data();
        },
        _load_data: function() {
            var self = this;

            return this._rpc({
                    model: this.modelName,
                    method: 'search_read',
                    context: this.webgl.context,
                    domain: this.webgl.domain,
                    fields: _.uniq(this.webgl.fields)
                })
                .then(function(result) {
                    self.webgl.data = result;
                });
        }

    });
    return WebglModel;
});
