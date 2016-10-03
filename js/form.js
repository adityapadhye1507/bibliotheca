// submit the form
function submitForm(){    
    var userName = byName("userName")[0].value;
    var userEmail = byName("email")[0].value;
    var book = object.name;

    if(validate(userName,userEmail)){    
        saveData(userName, userEmail, book)
        alert("We are processing your request for: "+ book 
              +"\nWe will Contact you soon with the availibility of the book"
              +"\nYour Contact info Provided\nName: "+ userName+"\t Email: "+userEmail);
        window.location.reload();
    } else{
        return false;
    }
}

// reset the application and reload the page
function startOver(){
    //clearCookies();
    window.location.reload();
}

//clear the data from loaclstorage or cookies
function clearCookies(){
    if(localStorage){
        localStorage.removeItem('book');
        localStorage.removeItem('name');
        localStorage.removeItem('email');    
    }
    else{
        SetCookie(GetCookie('book'), book);
        SetCookie(GetCookie('name'), name);
        SetCookie(GetCookie('email'), email);        
    }   
}

//Show the contents of the form
function showForm(){    
    //clear data from form div
    var form = byId("requestBookForm");
    clearElements( form );
    
    form.style.opacity = 0.0;
    
    var text = document.createTextNode("We need your info to make a request for you");
    var row = document.createElement("div");
    row.setAttribute("class","form-row");
    row.appendChild(text);
    form.appendChild(row);
    //Create a name input field
    var nameText = document.createTextNode("Enter Your Name: ");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type","text");
    nameInput.setAttribute("name","userName");
    
    //Create an email field
    var emailText = document.createTextNode("Enter Your Email: ");
    var emailInput = document.createElement("input");
    emailInput.setAttribute("type","text");
    emailInput.setAttribute("name","email");
    
    //Create a button to submit the form
    var submit = document.createElement("button");
    submit.appendChild(document.createTextNode("Request This Book"));
    submit.setAttribute("class","button");
    // attach event listener to reset button
    if(document.attachEvent){
        submit.attachEvent('click',function(){submitForm()});
    }else{
        submit.addEventListener("click",function(){submitForm()});
    }
    
    row = document.createElement("div");
    row.setAttribute("class","form-row");
    var textSpan = document.createElement("span");
    textSpan.appendChild(nameText);
    
    var inputSpan = document.createElement("span");
    inputSpan.appendChild(nameInput);
    
    row.appendChild(textSpan);
    row.appendChild(inputSpan);
    form.appendChild(row);
    
    row = document.createElement("div");
    row.setAttribute("class","form-row");
    textSpan = document.createElement("span");
    textSpan.appendChild(emailText);
    
    inputSpan = document.createElement("span");
    inputSpan.appendChild(emailInput);
    
    row.appendChild(textSpan);
    row.appendChild(inputSpan);
    form.appendChild(row);

    row = document.createElement("div");
    row.setAttribute("class","form-row");
    row.appendChild(submit);
    form.appendChild(row);
    
    fadeIn(form);
}
    
//Show contents of the book in result div
function showData(){
    //Clear data from the result div
    var result = byId("showResults");
    clearElements( result );
    
    result.style.opacity = 0.0;
    
    var title = document.createElement("p");
    title.setAttribute("class","result-title");
    var p = document.createElement("p");
    p.appendChild(document.createTextNode("You have selected this book"));
    title.appendChild(p);
    result.appendChild(title);
    
    var selects = document.getElementsByTagName("select");
    for (i=0 ; i<selects.length-1;i++){
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(selects[i].value));
        title.appendChild(p);
    }
    
    for (key in object){
        if(key!="image"){
            var row = document.createElement("div");
            row.setAttribute("class","result-row");

            var keySpan = document.createElement("span");
            keySpan.setAttribute("id","key");
            if(key=="name"){
                keySpan.appendChild(document.createTextNode("Book Name: "));
            }else{
                keySpan.appendChild(document.createTextNode(key+": "));
            }

            var valueSpan = document.createElement("span");
            valueSpan.setAttribute("id","value");
            valueSpan.appendChild(document.createTextNode(object[key]));

            row.appendChild(keySpan);
            row.appendChild(valueSpan);
            result.appendChild(row);
        }
    }
    fadeIn(result);
    showForm();
}


//form validations
function validate(name, email){
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(name == null || name == "" || name == " " ) 
    {
         window.alert("Please Enter Your Name!!");
        {
            return false;
        }

    }
    //test email
    else if(!(email.match(emailformat))) {
          window.alert("Please Enter a valid Email Id!!");
        {
            return false;
        }
    } else{
        return true;
    }
}


//save the data localstorage or cookies
function saveData(name,email,book)
{
    if(localStorage){
        localStorage.setItem('book', book);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);    
    }
    else{
        SetCookie('book', book);
        SetCookie('name', name);
        SetCookie('email', email);        
    }   
}