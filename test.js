//Create Site class to organize aites to add 
class Site {
    constructor(title, url, desc){
        let absoluteURL = url;
        //Use conditionals in the constructor to filter url
        if (!url.startsWith("http://") && !url.startsWith("https://")){
            //Use template literal to prefix the url
            absoluteURL = `https://${url}`;
        }
        this.title = title;
        this.url = absoluteURL;
        this.desc = desc;
    }

};

const main = document.getElementById("site-list");
const h1 = document.getElementById('title-header');
const statusArticle = document.getElementById('status-article');

//Make a function that inserts the list into main id="url-list"
const insertLink = siteClass => {
    //artile: contains title, url, desc
    const article = document.createElement("article");
    article.className = "site";
    article.classList.add("new-site");

    //h3: contains site title
    const h3 = document.createElement("h3");
    h3.textContent = siteClass.title;
    h3.className = "site-title";
    console.log("is this working?", h3);
    //a: contains site url
    const a = document.createElement("a");
    a.href = siteClass.url;
    a.textContent = a.href;
    a.className = "site-url";
    //h4: contains site desc
    const h4 = document.createElement("h4");
    h4.textContent = siteClass.desc;
    h4.className = "site-desc";

    //append elements to article
    article.appendChild(h3);
    article.appendChild(a);
    article.appendChild(h4);

    //insert article on top of all previous articles
    document.getElementById("all-articles").insertAdjacentElement("AfterBegin", article);

    //after 5 seconds, remove container highlight
    //this transition should be a gradient
    const newlyAdded = setTimeout(function(){
        article.classList.remove("new-site");
    }, 10000);
};

//make function that creates input within the specified form
const makeInput = (form, id, name, type) => {
    const input = document.createElement("input");
    input.type = type || "text";
    input.className = "input-box";
    input.id = id;
    input.name = name || id;
    input.required = true;
    //create label
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = name || id;
    label.appendChild(input);

    form.appendChild(label);
}

//cancel button for users who changed their mind
const makeCancelButton = (form) => {
    const cancelButton = document.createElement("button");
    cancelButton.id = "cancel-button";
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", e => {
        e.preventDefault();
        statusArticle.removeChild(form);
        makeInputButton();
    });
    form.appendChild(cancelButton);
};

const makeSubmitButton = (form, id) => {
    const button = document.createElement("button");
    button.type = "submit";
    button.id = id || "submit-button";
    button.textContent = "Add to List";
    form.appendChild(button);
};

//create submitLink function => 
const submitLink = () => {
    
    //create form
    const form = document.createElement("form");
    
    //forEach element in array, makeInput
    const inputArr = ["title", "url", "desc"];
    inputArr.forEach(element => {
        makeInput(form, element);
    });

    //make submit and cancel buttons for the form
    makeSubmitButton(form, "submit-button");
    makeCancelButton(form);
    //handle submit
    form.addEventListener("submit", e => {
        e.preventDefault();
        const submitButton = document.getElementById("submit-button");
        //disable submit button to prevent multiple clicks that lead to multiple statuses and input buttons 
        submitButton.disabled = true;

        let titleInput = document.querySelector("input[name='title']");
        let urlInput = document.querySelector("input[name='url']");
        let descInput = document.querySelector("input[name='desc']");

        //addition status box that disappears
        const status = setTimeout(function(){
            let statusBox = document.createElement("h2");
            statusBox.id = "stat-box";
            statusBox.textContent = `${titleInput.value} has been successfully added!`;
            statusArticle.appendChild(statusBox);
        }, 500);

        const addingDelay = setTimeout(function() {
            //remove form after submit
            statusArticle.removeChild(form);
            //was not working properly because I forgot to use a new class.
            const addSite = new Site(titleInput.value, urlInput.value, descInput.value); 
            insertLink(addSite);
            //console.log(titleInput.value, urlInput.value, descInput.value);
        }, 500);
        


        //remove status box
        const deleteStatus = setTimeout(function(){
            let statusBox = document.getElementById("stat-box");
            if (statusBox) {
                statusArticle.removeChild(statusBox);
                
            };
            makeInputButton();
        }, 2500);
        

        //don't reload the page
        return false;
    })


    statusArticle.appendChild(form);
}

//function that adds input button that reveals a form when clicked
const makeInputButton = (id) => {
    const inputButton = document.createElement("button");
    inputButton.id = id || "input-button";
    inputButton.textContent = "Add a Site";
    inputButton.addEventListener("click", e => {
        e.preventDefault();
        submitLink();
        //replace inputButton with cancel
        statusArticle.removeChild(e.target);
    });

    statusArticle.appendChild(inputButton);
};

makeInputButton();

/*test
const fb = new Site("Facebook", "facebook.com", "Blue Site");
insertLink(fb);
*/
const flink1 = "https://gist.githubusercontent.com/PRcorn/76e7dd878d33cef048718a5f74f7c868/raw/5a36a96b2b3fac9394ff090dd0cee2a720798835/test.json";
const flink2 = "https://gist.githubusercontent.com/PRcorn/76e7dd878d33cef048718a5f74f7c868/raw/5d585fb0985ffb8fc1195bf9650a994b8d241b68/test.json";

//test json
//used gist for now so access won't expire
fetch(flink2)
.then(response =>
    response.json()
)
.then(arr => {
    arr.forEach(obj => {
        const info = new Site(obj.title, obj.url, obj.desc);
        insertLink(info);
    });
})
.catch(err => {
    console.log(err.message)
})