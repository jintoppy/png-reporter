var REPORTER = (function(){

	var createTopFailureLine = function(fromPos, toPos){
		var div =  jQuery('<div/>');
		var height = Math.abs(fromPos.y - toPos.y);

		div.css({
			"top": toPos.y,
			"left": toPos.x+2,
			"width": "3px",
			"background-color": "red",
			"position": "absolute",
			"height": height
		});
		jQuery('body').append(div);

	};

	var createLeftFailureLine = function(fromPos, toPos){

		var div =  jQuery('<div/>');
		var width = Math.abs(fromPos.x - toPos.x);

		div.css({
			"top": toPos.y+2,
			"left": fromPos.x,
			"width": width,
			"height": "3px",
			"position": "absolute",
			"background-color": "red"
		});
		jQuery('body').append(div);
	};

	var createSuccessMsg = function(){
		var div = jQuery('<div/>');
		div.html('Success!');
		div.css({
			"top": window.innerHeight/2,
			"left": window.innerWidth/2,
			"position": "absolute",
			"color": "green",
			"font-weight": "bold",
			"font-size": "20px"
		});
		jQuery('body').append(div);

	};
		

	var generateReport = function(expectation){
		var totalFailures = 0;
		for(var i=0;i<expectation.length;i++){
			var currObj = expectation[i];
			var currNode = jQuery(currObj.selector);
			if(currNode.length>0){
				var currObjPos = util.getPosition(currNode[0]);
				_.each(currObj.top, function(value,key){
					var nodeToBeComparedForTop = jQuery(key);
					if(nodeToBeComparedForTop.length>0){
						var posToBeCompared = util.getPosition(nodeToBeComparedForTop[0]);
						if(Math.abs(currObjPos.y-posToBeCompared.y) != value){
							totalFailures++;
							createTopFailureLine(currObjPos, posToBeCompared);
						}
					}
				});

				_.each(currObj.left, function(value,key){
					var nodeToBeComparedForLeft = jQuery(key);
					if(nodeToBeComparedForLeft.length>0){
						var posToBeCompared = util.getPosition(nodeToBeComparedForLeft[0]);
						if(Math.abs(currObjPos.x-posToBeCompared.x) != value){
							totalFailures++;
							createLeftFailureLine(currObjPos, posToBeCompared);
						}
					}
				});

				if(totalFailures == 0){
					createSuccessMsg();
				}
			}

		}
	};

	return {
		generateReport: generateReport
	};

})();