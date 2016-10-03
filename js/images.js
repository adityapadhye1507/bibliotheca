// function to search the images object from JSON and populate it into an array
var getImages = function (data){
    for( key in data ){
        if(key=="image"){
            images.push(data[key]);
            //console.log("Adding image:",data[key]);
            break;
        }
        if(data[key].options != undefined){
            arguments.callee(data[key].options);
        } else if(data[key] != undefined){
            arguments.callee(data[key]);
        }
    }
}

// Show images present in the heirarchy of the object passed
// This will show all the images present under the object
function showImages(object){
    removeImages();
    images=[];
    console.log("showing images for :",object);
    getImages(object);
    
    var imagesDiv = byId("showImages");
    for(i=0;i<images.length;i++){
        var image = document.createElement("img");
        image.setAttribute("id", i);
        image.setAttribute("src", "images/"+images[i]);
        image.setAttribute("class","image");
        image.style.opacity = 0.0;
        imagesDiv.appendChild(image);
        fadeIn(image);
    }
}

// remove all the previously populated images if any
function removeImages(){
    var imagesDiv = byId("showImages");
    
    for(i=0;i<images.length;i++){
        var image = byId(i);
        if(image!=null){
            image.parentElement.removeChild(image);
        }
    }
}
