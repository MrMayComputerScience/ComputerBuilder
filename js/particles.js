const __particleSize__ = {
	w: "1%",
	h: "1%"
};
const __lifeTime__ = 2;
function __createParticle__(fileName, parent, xpos, ypos){
	var img = document.createElement("img");
	img.src = "img/"+fileName;
	img.style.width = __particleSize__.w;
	img.style.height = __particleSize__.h;
	img.setAttribute("x-pos", xpos);
	img.setAttribute("y-pos", ypos);
	parent.appendChild(img);
}

function particleExplosion(parent, numParticles){
	for(let i = 0; i < numParticles; i++){
		__createParticle__("particle.png", parent);
	}
}