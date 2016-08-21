/*
 This file is copyright 2016 by Johan Maasing <johan@zoom.nu>
 All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 
 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 
 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
$(document).ready(function () {

    var rendererContainer = $("#canvas");
    var width = rendererContainer.width();
    var height = rendererContainer.height();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var a = 0 ;

    renderer.setSize(width, height);
    rendererContainer.append(renderer.domElement);

    var loader = new THREE.ColladaLoader();
    var logo = null;
    var middleE = null ;
    // load a resource
    loader.load(
            // resource URL
            'http://localhost:8383/ThreeJS/mejsalogo3.dae',
            // Function when resource is loaded
                    function (object) {
                        scene.add(object.scene);
                        logo = object.scene;
                        logo.rotation.x = 0 ;
                        if (logo.children) {
                            for (var e = 0; e<logo.children.length; e++) {
                                var name = logo.children[e].name ;
                                if (name && name === "E-Circle-Curve") {
                                    middleE = logo.children[e] ;
                                }
                            }
                        }
                    }
            );


// White directional light at half intensity shining from the top.

            var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(0.5, 0.5, 1);
            scene.add(directionalLight);
            camera.position.z = 5;

            function render() {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
                if (logo) {
                    // logo.rotation.z += 0.01;
                    logo.rotation.y += 0.001;
                }
                if (middleE) {
                    middleE.rotation.z = Math.sin(a) ;
                    a += 0.01 ;
                }
            }
            render();
        }
);