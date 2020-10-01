//Create Site class to organize aites to add 
class Site {
    constructor(title, url, author){
        let absoluteURL = url;
        //Use conditionals in the constructor to filter url
        if (!url.startsWith("http://") && !url.startsWith("https://")){
            //Use template literal to prefix the url
            absoluteURL = `https://${url}`;
        }
        this.title = title;
        this.url = absoluteURL;
        this.author = author;
    }

};

const main = document.getElementById("site-list");
const h1 = document.getElementById('title-header');
const statusArticle = document.getElementById('status-article');
//Make a function that inserts the list into main id="url-list"
const insertLink = siteClass => {
    //main: where we append the article
    //const main = document.getElementById("site-list");   
    //artile: contains title, url, author
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
    //h4: contains site author
    const h4 = document.createElement("h4");
    h4.textContent = siteClass.author;
    h4.className = "site-author";

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

//create submitLink function => 
const submitLink = () => {
    
    //create form
    const form = document.createElement("form");
    //make function that creates input
    const makeInput = (id, name, type) => {
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
    //forEach element in array, makeInput
    const inputArr = ["title", "url", "author"];
    inputArr.forEach(element => {
        /*if (element === "url") {
            makeInput(element, element, "url");
        }   else {
        */    makeInput(element);
        //}
    });

    //cancel button for users who changed their mind
    const makeCancelButton = () => {
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

    //make submit button
    const button = document.createElement("button");
    button.type = "submit";
    button.id = "submit-button";
    button.textContent = "Add to List";
    
    form.appendChild(button);
    makeCancelButton();
    //handle submit
    form.addEventListener("submit", e => {
        e.preventDefault();
        //disable submit button to prevent multiple clicks that lead to multiple statuses and input buttons 
        button.disabled = true;

        let titleInput = document.querySelector("input[name='title']");
        let urlInput = document.querySelector("input[name='url']");
        let authorInput = document.querySelector("input[name='author']");

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
            const addSite = new Site(titleInput.value, urlInput.value, authorInput.value); 
            insertLink(addSite);
            //console.log(titleInput.value, urlInput.value, authorInput.value);
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
const makeInputButton = () => {
    const inputButton = document.createElement("button");
    inputButton.id = "input-button";
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

//test
const fb = new Site("Facebook", "facebook.com", "Mark");
insertLink(fb);