// Write - Your - Code - Here
class Link {
    constructor(title, url, author){//TIL: you can use conditionals in the constructor
        let absoluteURL = url;
        if (!url.startsWith("http://") && !url.startsWith("https://")){//prefix
            absoluteURL = `https://${url}`;
        }
        this.title = title;
        this.url = absoluteURL;
        this.author = author;
    }

    toString(){
        return `${this.title} (${this.url}). Author: ${this.author}`;
    }
}

const links = [];
links.push(new Link("Hacker News", "https://news.ycombinator.com", "Baptiste"));
links.push(new Link("Reddit", "https://reddit.com", "Thomas"));
links.push(new Link("Boing Boing", "boingboing.net", "Daniel"));

let choice;
while(choice !== "0"){
    const choices = "1: Show links\n2: Add a link\n3: Remove a link\n0:Quit";
    choice = prompt(`Choose an option: \n${choices}`);
    
    const listLinks = (whatToDo) => {
		let showLinks = "";
		let deleteNum;
		if (links.length > 0){
			for (let i = 0; i < links.length; i++){
				showLinks += `${i + 1}: ` + links[i].toString() + "\n";
			}
		}
        if (whatToDo == 1) {
            
            if (showLinks){
                    alert(`Here is the link list:\n${showLinks}`);
                }   else {
                    alert("There are no links yet.");
                }
        } else if (whatToDo == 3) {
			if (showLinks !== ""){
				deleteNum = prompt(`Here are the links:\n${showLinks}\nEnter the number of the link to delete`);
				if (deleteNum <= 0 || deleteNum > links.length){
					//out of bounds
					alert("No link deleted. Enter a valid link number.");
				}   else{
					links.splice(Number(deleteNum - 1), 1);
					alert("Link deleted.");
				}
			}    else {
				alert("There are no links yet.");
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
        case "3": {//delete not working, maybe convert to Number
            listLinks(3);
            break;
        }
    }
}
alert("See ya later!");