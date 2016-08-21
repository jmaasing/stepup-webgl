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
        var cubes = [] ;

	renderer.setSize(width, height);
	rendererContainer.append(renderer.domElement);
// White directional light at half intensity shining from the top.

	var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
	directionalLight.position.set(0.5, 0.5, 1);
	scene.add(directionalLight);
	camera.position.z = 20;

	var gridroot = new THREE.Object3D();
	scene.add(gridroot);

	var numcubes = 5 ;

	for (var x = 0; x < numcubes; x++) {
		for (var y = 0; y < numcubes; y++) {
			for (var z = 0; z < numcubes; z++) {
				var xpos = (x - (numcubes / 2)) * 2;
				var ypos = (y - (numcubes / 2)) * 2;
				var zpos = (z - (numcubes / 2)) * 2;
				var geometry = new THREE.BoxGeometry(1, 1, 1);
				var material = new THREE.MeshPhongMaterial({color: rgbToHex(Math.floor(x*(255/numcubes)),Math.floor(y*(255/numcubes)),Math.floor(z*(255/numcubes)))});
				var cube = new THREE.Mesh(geometry, material);
				cube.position.x = xpos;
				cube.position.y = ypos;
				cube.position.z = zpos;
				gridroot.add(cube);
                                cubes.push(cube) ;
			}
		}
	}

	function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		gridroot.rotation.y += 0.01;
                for (var n=0; n<cubes.length; n++) {
                    cubes[n].rotation.x += n / 20000 ;
                }
	}

	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	render();
}
);