"use strict"

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
function setDropzone(selector, accepts){
    interact(selector)
		.dropzone({
			accept: accepts,
            //TODO: Change this pct to make placement more precise
            //  -Make so dz must be fully covered, pct of area??
			overlap: 0.4,
			ondrop: function(evt){
                //TODO: some code that aligns the dropped element to the top-left corner of the dropzone
                
				evt.relatedTarget.classList.remove("draggable");
                
			},
	});
}

//Function callen when the body in index.html loads. 
//It initializes the drag-n-drop features and adds window listeners
function onBodyLoad(){
    
	interact(".draggable")
		.draggable({
			inertia: false,
			restrict: {
				restriction: "#container",
				endOnly: false,
				elementRect: {top: 0, left: 0, bottom: 1, right: 1}
			},
			autoScroll: true,
			onmove: dragMoveListener
	});
	setDropzone(".ram-dz", ".ram");
}

//Callback for when a draggable gets dragged
function dragMoveListener(evt){
	var target = evt.target, 
        x, y;
    
    //If the inline style has already been modified, base the change on that
    //else, use the default value
    if(target.style.top){
        x = parseFloat(target.style.left) + evt.dx;
        y = parseFloat(target.style.top) + evt.dy;    
    }
    else{
        x = parseFloat(getDefaultStyle(target, "left")) + evt.dx;
        y = parseFloat(getDefaultStyle(target, "top")) + evt.dy;
    }
    //IMPORTANT ERROR CHECKING
    if(isNaN(x) || isNaN(y))
        alert("the top or left properties of this draggable were not set in index.css. Please fix this and dont let it go to production");
    
    target.style.left = x + "px";
    target.style.top = y + "px";
    
}