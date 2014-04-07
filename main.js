(function(window,util,undefined){
var formattedJson = [];

function traverseDOM(element) {
    var nodeData, parentNode, elementNodeData;
    
    
    if(util.isValidElement(element)){
		elementNodeData = window.util.getNodeData(element);
		if (element.tagName == "BODY") {
			formattedJson.push(elementNodeData);
		}

		if(VISIBILITY.isVisible(element)){
			if (element.hasChildNodes()) {
				var parentData = window.util.findDeep(formattedJson, elementNodeData);
				if (parentData) {
					if (!parentData.childNodes) {
						parentData.childNodes = [];
					}
					for (var i = 0; i < element.childNodes.length; i++) {
						var node = element.childNodes[i];
						if (util.isValidElement(node)) {
							nodeData = window.util.getNodeData(node);
							parentData.childNodes.push(nodeData);
							traverseDOM(node);
						}
					}
				}
			}
		}
	}
}

var expectJsonObj=[];
function createExpectationObject(jsonObj){
		if(jsonObj && jsonObj.childNodes && jsonObj.childNodes.length>0){
				var obj={};
				obj["selector"] = jsonObj.selector;
				obj.top={};
				obj.left={};
				expectJsonObj.push(obj);
			for(var i=0;i<jsonObj.childNodes.length;i++){
				var currentObj = jsonObj.childNodes[i];
				obj.top[currentObj.selector] = Math.abs(currentObj.y-jsonObj.y);
				obj.left[currentObj.selector] = Math.abs(currentObj.x-jsonObj.x);
				createExpectationObject(currentObj);
			}
			
		}

}

util.loadJQuery(null,function(){
	traverseDOM(window.document.body);
	window.formattedJson = formattedJson;
	createExpectationObject(formattedJson[0]);
	console.log(formattedJson);
	console.log(expectJsonObj);
	REPORTER.generateReport(expectJsonObj);
});

})(window,util);