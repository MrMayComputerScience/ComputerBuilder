"use strict"

onResizeCb.oldWidth = window.innerWidth;
onResizeCb.oldHeight = window.innerHeight;
function makeDraggables(){
    window.addEventListener("resize", onResizeCb, true);
	interact(".draggable")
		.draggable({
			inertia: true,
			restrict: {
				restriction: "#container",
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
				dragElement.textContent = "Can Drop";
			},
			ondragleave: function(evt){
				evt.target.classList.remove("drop-target")
				evt.relatedTarget.classList.remove("can-drop");
				evt.relatedTarget.textContent = "Dragged Out";
				document.getElementById("continueButton").style.visibility = "hidden";
			},
			ondrop: function(evt){
				evt.relatedTarget.textContent = "Dropped";
				document.getElementById("continueButton").style.visibility = "visible";
			},
			ondropdeactivate: function(evt){
				evt.target.classList.remove("drop-active");
				evt.target.classList.remove("drop-target");
			}
	});
}
function onResizeCb(evt){
    var elems = document.getElementsByClassName("draggable");
    for(let i = 0; i < elems.length; i++){
        let e = elems[i];
        let datax = parseFloat(e.getAttribute("data-x"));
        let datay = parseFloat(e.getAttribute("data-y"));
        let width = window.innerWidth;
        let height = window.innerHeight;
        let dx = width - onResizeCb.oldWidth;
        let dy = height - onResizeCb.oldHeight;
        datax += dx;
        datay += dy;
        e.setAttribute("data-x", datax);
        e.setAttribute("data-y", datay);
        onResizeCb.oldHeight = height;
        onResizeCb.oldWidth = width;
        console.log("dx: "+dx + " dy: "+dy);
        e.style.transform = "translate("+datax+"px, "+datay+"px)";
    }
}
function dragMoveListener(evt){
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