(function(w){
	var minViewportWidth = 240, //Minimum Size for Viewport
		maxViewportWidth = 2600, //Maxiumum Size for Viewport
		viewportResizeHandleWidth = 14, //Width of the viewport drag-to-resize handle
		$aside = $('aside'), //Wrapper around viewport
		$sgWrapper = $('#sg-gen-container'), //Wrapper around viewport
		$sgViewport = $('#sg-viewport'), //Viewport element
		$sizePx = $('.sg-size-px'), //Px size input element in toolbar
		$sizeEms = $('.sg-size-em'), //Em size input element in toolbar
		$bodySize = 16, //Body size of the document
		discoID = false,
		fullMode = true,
		discoMode = false,
		hayMode = false,
		sw = $(window).width(), //Viewport Width
		hash = window.location.hash.replace(/^.*?#/,''),
		$select = $("nav.sizes select");
	
	$select.change(function(){
		var $val = $(this).find(":selected").val();

		switch($val){
			case "small":
				sizeSmall();
				break;
			case "medium":
				sizeMedium();
				break;
			case "large":
				sizeLarge();
				break;
			case "full":
				fullMode = true;
				onResize();
				break
		}
	});
	//URL Form Submission
	$('#url-form').submit(function(e) {
		var urlVal = $('#url').val();
		var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

		if(regex.test(urlVal)) {
			return;
		} else {
			var newURL = "http://"+urlVal;
			$('#url').val(newURL);
			return;
		}
		
	});
	
	$(w).resize(onResize);

	function onResize(){
   //      if($aside.hasClass('opened') && document.body.clientWidth > 768){
			// sw = document.body.clientWidth - $aside.width();
   //      }else{
			// sw = document.body.clientWidth;
   //      }
		
		// if(fullMode == true) {
		// 	sizeFull();
		// }

	}

	  $aside.bind('DOMSubtreeModified', function(e) {
	      onResize();
	  });

	/* Nav Active State */
	function changeActiveState(link) {
		var $activeLink = link;
		$activeLink.parent().parent().find(".active").removeClass('active');

		if(link) {
			$activeLink.addClass('active');
		}
	}

	/* Pattern Lab accordion dropdown */
	$('.sg-acc-handle').on("click", function(e){
		var $this = $(this),
			$panel = $this.next('.sg-acc-panel');
		e.preventDefault();
		$this.toggleClass('active');
		$panel.toggleClass('active');
	});

	//Size Trigger
	$('#sg-size-toggle').on("click", function(e){
		e.preventDefault();
		$(this).parents('ul').toggleClass('active');
	});
	
	//Size View Events

	//Click Size Small Button
	$('#sg-size-s').on("click", function(e){
		e.preventDefault();
		killDisco();
		killHay();
		fullMode = false;
		window.location.hash = 's';
		changeActiveState($(this));
		sizeSmall();
	});
	
	//Click Size Medium Button
	$('#sg-size-m').on("click", function(e){
		e.preventDefault();
		killDisco();
		killHay();
		fullMode = false;
		window.location.hash = 'm';
		changeActiveState($(this));
		sizeMedium();
	});
	
	//Click Size Large Button
	$('#sg-size-l').on("click", function(e){
		e.preventDefault();
		killDisco();
		killHay();
		fullMode = false;
		window.location.hash = 'l';
		changeActiveState($(this));
		sizeLarge();
	});

	//Click Full Width Button
	$('#sg-size-full').on("click", function(e){ //Resets 
		e.preventDefault();
		killDisco();
		killHay();
		changeActiveState($(this));
		fullMode = true;
		window.location.hash = '';
		sizeiframe(sw);
	});
	
	//Click Random Size Button
	$('#sg-size-random').on("click", function(e){
		e.preventDefault();
		fullMode = false;
		sizeRandom();
		window.location.hash = 'random';
	});

	//Size Small
	function sizeSmall() {
		// sizeiframe(getRandom(minViewportWidth,500));
		sizeiframe(480);
	}
	
	//Size Medium
	function sizeMedium() {
		// sizeiframe(getRandom(500,800));
		sizeiframe(768);
	}
	
	//Size Large
	function sizeLarge() {
		// sizeiframe(getRandom(800,1200));
		sizeiframe(1200);
	}

	//Size Random Size
	function sizeRandom() {
		killDisco();
		killHay();
		fullMode = false;
		changeActiveState($('#sg-size-random'));
		sizeiframe(getRandom(minViewportWidth,sw));
	}
	
	//Size Full
	function sizeFull() {
		sizeiframe(sw, false);
		updateSizeReading(sw);
	}
	
	//Click for Disco Mode, which resizes the viewport randomly
	$('#sg-size-disco').on("click", function(e){
		e.preventDefault();
		killHay();
		fullMode = false;

		if (discoMode) {
			killDisco();
			changeActiveState();
			window.location.hash = '';

		} else {
			startDisco();
			changeActiveState($(this));
			window.location.hash = 'disco';
		}
	});

	/* Disco Mode */
	function disco() {
		sizeiframe(getRandom(minViewportWidth,sw));
	}
	
	function killDisco() {
		discoMode = false;
		clearInterval(discoID);
		discoID = false;
	}
	
	function startDisco() {
		discoMode = true;
		discoID = setInterval(disco, 800);
	}

	//Stephen Hay Mode - "Start with the small screen first, then expand until it looks like shit. Time for a breakpoint!"
	$('#sg-size-hay').on("click", function(e){
		e.preventDefault();
		killDisco();

		if (hayMode) {
			killHay();
			changeActiveState();
			window.location.hash = '';
		} else {
			startHay();
			changeActiveState($(this));
			window.location.hash = 'hay';
		}
	});

	//Stop Hay! Mode
	function killHay() {
		var currentWidth = $sgViewport.width();
		hayMode = false;
		$sgViewport.removeClass('hay-mode');
		$sgWrapper.removeClass('hay-mode');
		sizeiframe(Math.floor(currentWidth));
	}
	
	// start Hay! mode
	function startHay() {
		hayMode = true;
		$sgWrapper.removeClass("vp-animate").width(minViewportWidth+viewportResizeHandleWidth);
		$sgViewport.removeClass("vp-animate").width(minViewportWidth);
		
		window.setTimeout(function(){
			$sgWrapper.addClass('hay-mode').width(maxViewportWidth+viewportResizeHandleWidth);
			$sgViewport.addClass('hay-mode').width(maxViewportWidth);
			
			setInterval(function(){ var vpSize = $sgViewport.width(); updateSizeReading(vpSize); },100);
		}, 200);
	}

	//Pixel input
	$sizePx.on('keydown', function(e){
		var val = Math.floor($(this).val());

		if(e.keyCode === 38) { //If the up arrow key is hit
			val++;
			sizeiframe(val,false);
			window.location.hash = val;
		} else if(e.keyCode === 40) { //If the down arrow key is hit
			val--;
			sizeiframe(val,false);
			window.location.hash = val;
		} else if(e.keyCode === 13) { //If the Enter key is hit
			e.preventDefault();
			sizeiframe(val); //Size Iframe to value of text box
			window.location.hash = val;
			$(this).blur();
		}
		changeActiveState();
	});

	$sizePx.on('keyup', function(){
		var val = Math.floor($(this).val());
		updateSizeReading(val,'px','updateEmInput');
	});

	//Em input
	$sizeEms.on('keydown', function(e){
		var val = parseFloat($(this).val());

		if(e.keyCode === 38) { //If the up arrow key is hit
			val++;
			sizeiframe(Math.floor(val*$bodySize),false);
		} else if(e.keyCode === 40) { //If the down arrow key is hit
			val--;
			sizeiframe(Math.floor(val*$bodySize),false);
		} else if(e.keyCode === 13) { //If the Enter key is hit
			e.preventDefault();
			sizeiframe(Math.floor(val*$bodySize)); //Size Iframe to value of text box
		}
		changeActiveState();
		
		window.location.hash = parseInt(val*$bodySize);
	});

	$sizeEms.on('keyup', function(){
		var val = parseFloat($(this).val());
		updateSizeReading(val,'em','updatePxInput');
	});
	
	// handle the MQ click
	$('#sg-mq a').on("click", function(e){
		e.preventDefault();
		var val = $(this).html();
		var type = (val.indexOf("px") !== -1) ? "px" : "em";
		val = val.replace(type,"");
		var width = (type === "px") ? val*1 : val*$bodySize;
		sizeiframe(width,true);
	});
	
	//Resize the viewport
	//'size' is the target size of the viewport
	//'animate' is a boolean for switching the CSS animation on or off. 'animate' is true by default, but can be set to false for things like nudging and dragging
	function sizeiframe(size,animate) {
		sw = $(window).width();
		var maxViewportWidth = $('aside').hasClass('opened') ? sw - $('aside').width() : 2600;
		var theSize;

		if(size == sw && $('aside').hasClass('opened')) size = size - $('aside').width();

		if(size>maxViewportWidth && size !== sw) { //If the entered size is larger than the max allowed viewport size, cap value at max vp size
			theSize = maxViewportWidth;
		} else if(size<minViewportWidth) { //If the entered size is less than the minimum allowed viewport size, cap value at min vp size
			theSize = minViewportWidth;
		} else {
			theSize = size;
		}

		//Conditionally remove CSS animation class from viewport
		if(animate===false) {
			$sgWrapper.removeClass("vp-animate");
			$sgViewport.removeClass("vp-animate"); //If aninate is set to false, remove animate class from viewport
		} else {
			$sgWrapper.addClass("vp-animate");
			$sgViewport.addClass("vp-animate");
		}

		$sgWrapper.width(theSize+viewportResizeHandleWidth); //Resize viewport wrapper to desired size + size of drag resize handler
		$sgViewport.width(theSize); //Resize viewport to desired size

		updateSizeReading(theSize); //Update values in toolbar
	}
	

	
	
	//Update Pixel and Em inputs
	//'size' is the input number
	//'unit' is the type of unit: either px or em. Default is px. Accepted values are 'px' and 'em'
	//'target' is what inputs to update. Defaults to both
	function updateSizeReading(size,unit,target) {
		if(unit=='em') { //If size value is in em units
			emSize = size;
			pxSize = Math.floor(size*$bodySize);
		} else { //If value is px or absent
			pxSize = size;
			emSize = size/$bodySize;
		}
		
		if (target == 'updatePxInput') {
			$sizePx.val(pxSize);
		} else if (target == 'updateEmInput') {
			$sizeEms.val(emSize.toFixed(2));
		} else {
			$sizeEms.val(emSize.toFixed(2));
			$sizePx.val(pxSize);
		}
	}
	
	/* Returns a random number between min and max */
	function getRandom (min, max) {
	    var num = Math.random() * (max - min) + min;
	    
	    return parseInt(num);
	}
	
	function updateViewportWidth(size) {
		$sgViewport.width(size);
		$sgWrapper.width(size*1 + 14);
		
		updateSizeReading(size);
	}

	// handles widening the "viewport"
	//   1. on "mousedown" store the click location
	//   2. make a hidden div visible so that it can track mouse movements and make sure the pointer doesn't get lost in the iframe
	//   3. on "mousemove" calculate the math, save the results to a cookie, and update the viewport
	$('#sg-rightpull').mousedown(function(event) {
		
		// capture default data
		var origClientX = event.clientX;
		var origViewportWidth = $sgViewport.width();
		
		fullMode = false;
		
		// show the cover
		$("#sg-cover").css("display","block");
		
		// add the mouse move event and capture data. also update the viewport width
		$('#sg-cover').mousemove(function(event) {
			
			viewportWidth = (origClientX > event.clientX) ? origViewportWidth - ((origClientX - event.clientX)*2) : origViewportWidth + ((event.clientX - origClientX)*2);
			
			if (viewportWidth > minViewportWidth) {
				
				
				window.location.hash = viewportWidth;
				sizeiframe(viewportWidth,false);
			}
		});
	});

	// on "mouseup" we unbind the "mousemove" event and hide the cover again
	$('body').mouseup(function(event) {
		$('#sg-cover').unbind('mousemove');
		$('#sg-cover').css("display","none");
	});

	// capture the viewport width that was loaded and modify it so it fits with the pull bar
	var origViewportWidth = $sgViewport.width();
	$sgWrapper.width(origViewportWidth);
	$sgViewport.width(origViewportWidth - 14);
	updateSizeReading($sgViewport.width());



	//Read Hash In URL
	if(hash === 'hay') { 
		startHay(); ///Start Hay mode if hash says 'hay'
	} else if(hash === 'disco') {
		startDisco(); //Start disco mode if hash says 'disco'
	} else if(hash === 'random') {
		sizeRandom(); ///Random screen size if hash says 'random'
	} else if(hash === 'l') {
		sizeLarge();
	} else if(hash === 'm') {
		sizeMedium();
	} else if(hash === 's') {
		sizeSmall();
	} else if(!isNaN(hash) && hash !== '') { //if screen size is a number
		sizeiframe(parseInt(hash));
		console.log('this is a number');
	} else {
		sizeFull();
		console.log('this is not a number');
	}

})(this);
