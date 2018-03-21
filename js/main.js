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
		interact('.dropzone').dropzone({
		  // only accept elements matching this CSS selector
		  accept: '#yes-drop',
		  // Require a 75% element overlap for a drop to be possible
		  overlap: 0.75,

		  // listen for drop related events:

		  ondropactivate: function (event) {
		    // add active dropzone feedback
		    event.target.classList.add('drop-active');
		  },
		  ondragenter: function (event) {
		    var draggableElement = event.relatedTarget,
		        dropzoneElement = event.target;

		    // feedback the possibility of a drop
		    dropzoneElement.classList.add('drop-target');
		    draggableElement.classList.add('can-drop');
		    draggableElement.textContent = 'Dragged in';
		  },
		  ondragleave: function (event) {
		    // remove the drop feedback style
		    event.target.classList.remove('drop-target');
		    event.relatedTarget.classList.remove('can-drop');
		    event.relatedTarget.textContent = 'Dragged out';
		  },
		  ondrop: function (event) {
		    event.relatedTarget.textContent = 'Dropped';
		  },
		  ondropdeactivate: function (event) {
		    // remove active dropzone feedback
		    event.target.classList.remove('drop-active');
		    event.target.classList.remove('drop-target');
		  }
		});
}
function dragMoveListener(evt){
	console.log("help");
	var target = evt.target, x, y;
	x = (parseFloat(target.getAttribute("data-x")) || 0) + evt.dx;
	y = (parseFloat(target.getAttribute("data-y")) || 0) + evt.dy;
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