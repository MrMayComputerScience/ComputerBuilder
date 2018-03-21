"use strict"
function makeDraggables(){
	interact(".draggable")
		.draggable({
			inertia: true,
			restrict: {
				restriction: "parent",
				endOnly: true,
				elementRect: {top: 0, left: 0, bottom: 1, right: 1}
			},
			autoScroll: true,
			onmove: dragMoveListener
		});
}
function dragMoveListener(evt){
	console.log("help");
	var target = evt.target, x, y;
	x = (parseFloat(target.getAttribute("data-x")) || 0) + evt.dx;
	y = (parseFloat(target.getAttribute("data-y")) || 0) + evt.dy;
	target.style.webkitTransform = 
	target.style.transform = "translate("+x+"px, "+y+"px)";
	target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function setFrame(){
	var myFrame = document.getElementById("myFrame");
	myFrame.style.width = window.innerWidth/2 + "px"
	myFrame.style.height = window.innerHeight/2 + "px";
	myFrame.src = "index.html";
}