odoo.define('web_webgl.WebglRenderer', function(require) {
    "use strict";

    var AbstractRenderer = require('web.AbstractRenderer');
    var core = require('web.core');
    var web_editor_base = require('web_editor.base');
    var field_utils = require('web.field_utils');
    var _lt = core._lt;

    var WebglRenderer = AbstractRenderer.extend({
        className: "o_webgl_view_container",
        init: function() {
            this.WIDTH = window.innerWidth;
            this.HEIGHT = window.innerHeight - 107;
            this._super.apply(this, arguments);
        },
        _render: function() {
            var self = this;
            return $.when().done(function() {

                self._destroScene();
                self._resizeScene();
                self._initScene();
                self._renderScene();
            });
        },

        _initScene: function() {
            var self = this;
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(35, this.WIDTH / this.HEIGHT, 10, 2000);
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            this.light = new THREE.DirectionalLight(0xffffff, 1);
            this.light.position.set(1, 1, 1);

            this.cubes = [];
            _.each(this.webgl.data, function(e, i) {
                var image = document.createElement('img');
                var texture = new THREE.Texture(image);
                texture.minFilter = THREE.LinearFilter;
                image.onload = function() {
                    texture.needsUpdate = true;
                    texture.image = image;
                };
                image.src = 'data:image/jpg;base64,' + e.image;


                var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    map: texture
                }));
                cube.position.x = (i * 2);
                self.cubes.push(cube);
                self.scene.add(cube);
            });
            this.renderer.setSize(this.WIDTH, this.HEIGHT);
            this.camera.position.z = 25;
            this.scene.add(this.light);
            this.renderer.domElement.style.position = "relative";
            this.el.appendChild(this.renderer.domElement);
        },

        _resizeScene: function() {
            if ($('.o_view_manager_content').length) {
                this.WIDTH = $('.o_view_manager_content').width();
                this.HEIGHT = $('.o_view_manager_content').height();
            }
        },

        _destroScene: function() {
            if (this.req) {
                cancelAnimationFrame(this.req);
            }
            this.$el.find('canvas').remove();
        },

        _renderScene: function() {
            var self = this;
            _.each(this.cubes, function(cube) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            });
            this.camera.lookAt(this.scene.position);
            this.renderer.render(this.scene, this.camera);
            this.req = requestAnimationFrame(function() {
                self._renderScene();
            });
        }
    });
    return WebglRenderer;

});
