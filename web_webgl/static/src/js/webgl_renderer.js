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

                self._destroyScene();
                self._resizeScene();
                self._initScene();
                self._renderScene();
            });
        },

        _initScene: function() {
            var self = this;
            this.center = new THREE.Vector3();
            this.INTERSECTED = null;
            this.center.z = -10;
            this.raycaster = new THREE.Raycaster();
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(50, this.WIDTH / this.HEIGHT, 1, 10000);
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            this.light = new THREE.DirectionalLight(0xffffff, 1);
            this.light.position.set(1, 1, 1);

            this.cubes = [];
            var posy = 1;
            var posx = 1;
            var posz = 1;
            _.each(this.webgl.data, function(e, i) {
                var image = document.createElement('img');
                var texture = new THREE.Texture(image);
                texture.minFilter = THREE.LinearFilter;
                image.onload = function() {
                    texture.needsUpdate = true;
                    texture.image = image;
                };
                image.src = 'data:image/jpg;base64,' + e.image;


                var cube = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.5, 4.5), new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    map: texture
                }));


                posx++;
                if (i % 5 === 0) {
                    posy++;
                    posx = 1;
                }

                if (posy % 5 === 0) {
                    posz--;
                    posy = 1;
                }

                cube.position.y = (posy * 6);
                cube.position.x = (posx * 6);
                cube.position.z = ((posz - 1) * 6);
                self.cubes.push(cube);
                self.scene.add(cube);
            });
            this.renderer.setSize(this.WIDTH, this.HEIGHT);
            this.mouse = new THREE.Vector2();
            this.camera.position.set(0, 0, 20);
            this.scene.add(this.light);
            this.renderer.domElement.style.position = "relative";
            this.el.appendChild(this.renderer.domElement);


            document.addEventListener('mousemove', self._onMouseMove.bind(this, self), false);
            window.addEventListener('resize', self._onResize.bind(this, self), false);


        },

        _resizeScene: function() {
            if ($('.o_view_manager_content').length) {
                this.WIDTH = $('.o_view_manager_content').width();
                this.HEIGHT = $('.o_view_manager_content').height();
            }
        },

        _destroyScene: function() {
            var self = this;
            if (this.req) {
                cancelAnimationFrame(this.req);
            }
            document.removeEventListener('mousemove', self._onMouseMove.bind(this, self), false);
            window.removeEventListener('resize', self._onResize.bind(this, self), false);

            this.$el.find('canvas').remove();
        },

        _renderScene: function() {
            var self = this;
            _.each(this.cubes, function(cube) {
                cube.rotation.x += 0.001;
                cube.rotation.y += 0.001;
            });
            this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.05;
            this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
            //this.camera.updateMatrixWorld();
            this.raycaster.setFromCamera(this.mouse, this.camera);

            var intersects = this.raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                console.log(intersects[0].object.geometry.type)
                if (this.INTERSECTED != intersects[0].object) {

                    this.INTERSECTED = intersects[0].object;


                }
            } else {

                this.INTERSECTED = null;
            }



            this.renderer.render(this.scene, this.camera);
            this.req = requestAnimationFrame(function() {
                self._renderScene();
            });
        },
        _onMouseMove: function(self, e) {

            self.mouse.x = (e.clientX - self.WIDTH / 2) * .2
            self.mouse.y = (e.clientY - self.HEIGHT / 2) * .2
        },

        _onResize: function(self, e) {
            self._resizeScene();
            self.camera.aspect = self.WIDTH / self.HEIGHT;
            self.camera.updateProjectionMatrix();
            self.renderer.setSize(self.WIDTH, self.HEIGHT);
        }
    });
    return WebglRenderer;

});
