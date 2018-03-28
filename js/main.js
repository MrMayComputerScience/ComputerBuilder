"use strict"

onResizeCb.oldWidth = window.innerWidth;
onResizeCb.oldHeight = window.innerHeight;

//Function to retrieve the CSS property of an object as it was defined in its CSS file
//@returns - a string representation of the property value
function getDefaultStyle(element, prop) {
    var parent = element.parentNode,
        computedStyle = getComputedStyle(element),
        value;
    parent.style.display = 'none';
    value = computedStyle.getPropertyValue(prop);
    parent.style.removeProperty('display');
    return value;
}

//Function callen when the body in index.html loads. 
//It initializes the drag-n-drop features and adds window listeners
function onBodyLoad(){
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
//Callback for when the window resizes. 
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
//Callback for when a draggable gets dragged
function dragMoveListener(evt){
    
	var target = evt.target, 
        x, y, 
        container;
    
    container = document.getElementById("container");
    
    var cx = container.getBoundingClientRect().width, 
        cy = container.getBoundingClientRect().height;
    
    var pctx = evt.dx/cx * 100, pcty = evt.dy/cy * 100;
    
    //If the inline style has already been modified, base the change on that
    //else, use the default value
    if(target.style.top){
        x = parseFloat(target.style.left) + pctx;
        y = parseFloat(target.style.top) + pcty;    
    }
    else{
        x = parseFloat(getDefaultStyle(target, "left")) + pctx;
        y = parseFloat(getDefaultStyle(target, "top")) + pcty;
    }
    target.style.left = x + "%";
    target.style.top = y + "%";
    
}
//Loads index.html into an iFrame on the page
function setFrame(){
	var myFrame = document.getElementById("myFrame");
	myFrame.style.width = window.innerWidth/2 + "px"
	myFrame.style.height = window.innerHeight/2 + "px";
	myFrame.src = "index.html";
}