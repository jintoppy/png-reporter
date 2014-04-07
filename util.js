var util = (function(){

	var loadJQuery = function(url, callback){
		if(window.jquery){
			callback();
		}
		else{
			if(!url){
			url = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js";
			}

			var script = document.createElement("script");
			script.type = "text/javascript";

			if (script.readyState) { //IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
			} else { //Others
				script.onload = function () {
					callback();
				};
			}

			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
		

	};

	var findDeep = function(items, attrs) {

    function match(value) {
        for (var key in attrs) {
            if (attrs[key] !== value[key]) {
                return false;
            }
        }

        return true;
    }

    function traverse(value) {
        var result;

        _.forEach(value, function (val) {
            if (val && match(val)) {
                result = val;
                return false;
            }

            if (_.isObject(val) || _.isArray(val)) {
                result = traverse(val);
            }

            if (result) {
                return false;
            }
        });

        return result;
    }

    return traverse(items);

};

var _getStyle = function(el, property) {
      if ( window.getComputedStyle ) {
        return document.defaultView.getComputedStyle(el,null)[property];
      }
      if ( el.currentStyle ) {
        return el.currentStyle[property];
      }
    };


var getPosition = function(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
};

var isValidElement = function(element){
	return (!_.contains(["SCRIPT", "STYLE", "NOSCRIPT"], element.tagName)) && element.nodeType === 1;
};

var getSelector = function(element){
	if(element.tagName === 'BODY'){
		return 'body';
	}
	if(element.id){
		return '#' + element.id;
	}
	else if(element.className){
		return '.' + element.className.join('.');
	}

	var elIndex = 1;
	var siblingElements = element.parentNode.getElementsByTagName(element.tagName.toLowerCase());
		
	for(var k=0;k<siblingElements.length;k++){
		if(siblingElements[k] === element){
			break;
		}
		elIndex++;
	}

	var selectorStr = siblingElements.length ==1? element.tagName.toLowerCase():
						element.tagName.toLowerCase() + ':nth-child(' +elIndex + ')';
	
	var currEl = element.parentNode;
	while(!currEl.id && !currEl.className && currEl.tagName !== 'BODY'){
		selectorStr = currEl.tagName.toLowerCase() + ' ' + selectorStr;
		currEl = currEl.parentNode;
	}
	if(currEl.tagName === 'BODY'){
		return 'body '+selectorStr;
	}
	selectorStr = currEl.id? '#'+currEl.id + ' ' + selectorStr:
					'.' + currEl.className.join('.') + ' ' +selectorStr;
	return selectorStr;

};

var getNodeData = function(element){
	var pos = this.getPosition(element);
	var selector = this.getSelector(element);
	return {
		selector: selector,
		tagName: element.tagName,
		content: element.innerHTML,
		x: pos.x,
		y: pos.y
	};
};


	return {
		loadJQuery: loadJQuery,
		findDeep: findDeep,
		getPosition: getPosition,
		isValidElement: isValidElement,
		getSelector: getSelector,
		getNodeData: getNodeData
	};

})();