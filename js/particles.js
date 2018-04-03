const __particleSize__ = {
	w: "25px",
	h: "25px"
};
const __lifeTime__ = 2;
function __createParticle__(fileName, parent, xpos, ypos){
	var img = document.createElement("img");
	img.src = "img/"+fileName;
    img.style.position = "absolute";   
	img.style.width = __particleSize__.w;
	img.style.height = __particleSize__.h;
    img.style.top = ypos+"px";
    img.style.left = xpos+"px";
    console.log("Creation: "+ xpos + ", " + ypos);
	parent.appendChild(img);
    return img;
}

function particleExplosion(parent, cx, cy, numParticles){
    var angle = 360/numParticles;
    var particles = [];
    var audio = document.getElementById("tada");
    audio.pause();
    audio.currentTime = 0;
    audio.play();
	for(let i = 0; i < numParticles; i++){
		let img = __createParticle__("particle.png", parent, cx, cy);
        img.setAttribute("angle", angle*i);
        particles[i] = img;
	}
    
    var pos = 0;
    var id = setInterval(() => {
        if(pos >= 20){
            clearInterval(id);
            for(let i = 0; i < particles.length; i++){
                parent.removeChild(particles[i]);
            }
        }
        else{
            pos++;
            console.log(pos);
            for(let i = 0; i < particles.length; i++){
                let currAngle = particles[i].getAttribute("angle");
                currAngle = parseFloat(currAngle);
                let x = parseFloat(particles[i].style.left);
                let y = parseFloat(particles[i].style.top);
                console.log(x + ", "+ y);
                x += pos*Math.cos(currAngle);
                y += pos*Math.sin(currAngle);
                particles[i].style.left = x+"px";
                particles[i].style.top = y+"px";
                
            }
        }
    },20)
    
}