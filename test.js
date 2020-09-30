//Create Link class to organize links to add 
class Link {
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
    //Add a method that returns a string of Link info
    toString(){
        return `${this.title} (${this.url}). Author: ${this.author}`;
    }
}

//initialize links array
const links = [];
links.push(new Link("Hacker News", "https://news.ycombinator.com", "Baptiste"));
links.push(new Link("Reddit", "https://reddit.com", "Thomas"));
links.push(new Link("Boing Boing", "boingboing.net", "Daniel"));


let choice;
while(choice !== "0"){
    //present the user with options
    const options = "1: Show links\n2: Add a link\n3: Remove a link\n0:Quit";
    choice = prompt(`Choose an option: \n${options}`);
    

    const listLinks = (whatToDo) => {
		let showLinks = "";
		let deleteNum;
		if (links.length > 0){
			for (let i = 0; i < links.length; i++){
				showLinks += `${i + 1}: ` + links[i].toString() + "\n";
			}
		}

        const noLinkAlert = () => {
            alert("There are no links yet.");
        };
        
        if (whatToDo == 1) {
            
            if (showLinks){
                    alert(`Here is the link list:\n${showLinks}`);
                }   else {
                    noLinkAlert();
                }
        } else if (whatToDo == 3) {
			if (showLinks !== ""){
				deleteNum = prompt(`Here are the links:\n${showLinks}\nEnter the number of the link to delete`);
				if (deleteNum <= 0 || deleteNum > links.length){//if out of bounds
					alert("No link deleted. Enter a valid link number.");
				}   else{
					links.splice(Number(deleteNum - 1), 1);
					alert("Link deleted.");
				}
			}    else {
				noLinkAlert();
			}
        }
    }

    switch(choice) {
        case "1": {
            listLinks(1);
            break;
        }
        case "2": {
            const title = prompt("Enter link title:");
            const url = prompt("Enter link url:");
            const author = prompt("Enter link author:");
            links.push(new Link(title, url, author));
            break;
        }
        case "3": {
            listLinks(3);
            break;
        }
    }
}
alert("Winners never quit. Those who are done do.");