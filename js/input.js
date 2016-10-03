
//method to remove any previously existing select boxes
function removeSelect( select ){
    // clear data from form div if any
    var form = byId("requestBookForm");
    clearElements( form );
    // Clear data from the result div if any
    var result = byId("showResults");
    clearElements( result );
    
    while(select.nextSibling!=null){
        var next = select.nextSibling;
        next.parentElement.removeChild(next);
    }
    if(select!=null){
        var prev = select.previousSibling;
        if(prev!=null){
            prev.parentElement.removeChild(prev);
        }
        select.parentElement.removeChild(select);
    }
}

//method to populate a select box dynamically
function populateSelect( data, name ){
    
    // search for the select box in document
    var select = byId(data.id);
    
    //if the select box already exist, remove it and repopulate it
    // also remove any other select box which are not relevant
    if(select != null){
        removeSelect( select );
    }
    
    // create text node for the question
    var question = document.createTextNode(data.question);
    var p = document.createElement('p');
    p.setAttribute("class","question");
    p.appendChild(question);
    
    // create a select box
    select = document.createElement('select');
    select.setAttribute("id",data.id);
    select.setAttribute("class","select-box");
    
    // attach event listener to select
    if(document.attachEvent){
        select.attachEvent('change',function(){selectChanged(this.value)});
    }else{
        select.addEventListener("change",function(){selectChanged(this.value)});
    }

    // create a default option
    var element = document.createElement('option');
    element.setAttribute("value","");
    element.text = "--Select a choice--";
    select.appendChild(element);
    
    // create options for the select box
    for( key in data.options ){
        if(key!="type"){
            var element = document.createElement('option');
            element.setAttribute("value",data.options[key].name);
            element.text = data.options[key].name;
            select.appendChild(element);
        }
    }
    
    //attach the elements to body
    p.style.opacity = 0.0;
    byId("input").appendChild(p);
    fadeIn(p);
    select.style.opacity = 0.0;
    byId("input").appendChild(select);
    fadeIn(select);
}

// function to handle select change event
function selectChanged( value ){
    // check if value is not empty string
    if(value != ""){
        // pass this value to get a function to get data from json object
        getObjectFromData(value);
        // pass this data to the populate next select or show the books if leaf node
        if(object.options!=undefined){    
            populateSelect(object, object.name);
            showImages(object.options);
        } else{
            showImages(object);
            showData();
        }
    }
}