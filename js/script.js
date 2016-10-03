/***********    BROWSER CHECK FUNCTIONALITY      ***************/
// to get the http object
function getHTTPObject() {
	var xmlhttp;
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest){
  		xmlhttp=new XMLHttpRequest()
  	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject){
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
  	}else{	
 		return false;
  	} 
  	
  	return xmlhttp;
}
// Initialize variables here
var http = getHTTPObject(); // We create the HTTP Object
var url = "data/data.json";
var data = "";
var object = "";
var foundObject = false;
var images = [];

function byTag(tag,idx=0){
    return document.getElementsByTagName(tag)[idx];
}    
function byId(id){
    return document.getElementById(id);
}
function byName(name){
    return document.getElementsByName(name);
}

/***********    BROWSER CHECK FUNCTIONALITY  ENDS    ***************/



/***********    INITIALIZATION      ***************/


// function to populate the header on page

function getHeader(){
    var header = byId("header");
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Bibliotheca"));
    header.appendChild(h1);
    
    var h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode("An Online book rental store"));
    header.appendChild(h2);
    
    var h3 = document.createElement("h3");
    //check if user is revisitng the page or not
    var book="",name="";
    if(localStorage){
        book = localStorage.getItem('book');
        name = localStorage.getItem('name');
    }
    else{
        book = GetCookie('book');
        name = GetCookie('name');
    }
    if(name!= null){
        console.log(book,name);
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("Welcome back: "+name));
        h3.appendChild(p);
        
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("We are processing your request for : "+book));
        h3.appendChild(p);
        
    }else{
        h3.appendChild(document.createTextNode("Welcome, looks like this if the first time you are visiting here!!!"));
    }
    header.appendChild(h3);
    
}

//Function to initialize the page
function init(){
    
    checkBrowser();
    
    getData(url, populateData);
    
    getHeader();
    
    
    //Create a start over button
    var reset = document.createElement("button");
    reset.appendChild(document.createTextNode("Start Over"));
    reset.setAttribute("class","button");
    // attach event listener to reset button
    if(document.attachEvent){
        reset.attachEvent('click',function(){startOver()});
    }else{
        reset.addEventListener('click',function(){startOver()});
    }
    byId("startOver").appendChild(reset);
}

// function to get data from a url using GET method
function getData(url, callback) {
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this);
    }
  };
  http.open("GET", url, true);
  http.send();
}

// method to be called after the AJAX call
function populateData(http) {
    // parse the http response data into JSON object 
    data = JSON.parse(http.responseText);
    
    // load all the images initially
    showImages(data.options);
    
    //populate 1st select statement
    populateSelect(data, data.name);    
}


/***********    INITIALIZATION   END   ***************/


/***********    DATA SELECTION FUNCTIONALITY   ***************/

// wrapper function to use getObject method
function getObjectFromData(value){
        object = "";
        foundObject = false;
        getObject(data.options, value);
        foundObject = false;
}

// function to search the javascript object from JSON
var getObject = function (option, value){
    for( key in option ){
        if(value==option[key].name){
            foundObject = true;
            object = option[key];
            console.log("found the value", value, object);
            break;
        }
        if(option[key].options != undefined){
            if(!foundObject){}
                arguments.callee(option[key].options , value);
            } else if(value==option[key].options){
                foundObject = true;
                object = option[key];
                break;
            }
        }
}

/***********    DATA SELECTION FUNCTIONALITY ENDS  ***************/


function clearElements(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
function fadeIn(div){
	// if the element exists
	if (div) {
			var opacity = parseFloat(div.style.opacity);
            if (opacity < 1.0){
				div.style.opacity = parseFloat(div.style.opacity) + .02;
                setTimeout(function(){fadeIn(div);},20);
			}
		}
}