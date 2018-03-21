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
	interact(".dropzone")
		.dropzone({
			accept: "#drag-one",
			overlap: 0.5,
			ondropactivate: function(evt){
				evt.target.classList.add("drop-active");
			},
			ondragenter: function(evt){
				var dragElement = evt.relatedTarget,
					dzElement = evt.target;
				dzElement.classList.add("drop-target");
				dragElement.classList.add("can-drop");
				console.log("Entered");
				dragElement.textContext = "Can Drop";
			},
			ondragleave: function(evt){
				evt.target.classList.remove("drop-target")
				evt.relatedTarget.classList.remove("can-drop");
				evt.relatedTarget.textContext = "Dragged Out";
			},
			ondrop: function(evt){
				evt.relatedTarget.textContext = "Dropped";
			},
			ondropdeactivate: function(evt){
				evt.target.classList.remove("drop-active");
				evt.target.classList.remove("drop-target");
			}
		});
}
function dragMoveListener(evt){
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