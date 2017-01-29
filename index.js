var APP_ID = "6cc6df33-1f71-48d0-9868-e1de48b64467";

var app = new PusherPlatform.App({
    appId: '6cc6df33-1f71-48d0-9868-e1de48b64467',
});

console.log(app);

var myFeed = app.feed('recipeResearch');

load();

function addNewIdeaToList(newIdea, SEND_AGAIN) {
    var newIdea = document.getElementById("newIdea").value;

    if (SEND_AGAIN) {
        myFeed.append(newIdea)
            .then(function(response) {
                console.log("Success" + newIdea);
                console.log(response)
            })
            .catch(err => console.error('Error:', err));

        console.log("Idea: " + newIdea);

        myFeed.append({ yourKey: APP_ID, message: newIdea})
            .then(response => console.log('Success:', response))
            .catch(err => console.error('Error:', err));
    }


}

function newItem(newItem) {
    console.log(typeof newItem)

    if (typeof newItem === "string") {
        var newTextNode = document.createTextNode(newItem);

        var newIdeaLi = document.createElement("li");
        newIdeaLi.appendChild(newTextNode);
        document.getElementById("ideasList").appendChild(newIdeaLi);
    }

}

function load() {

    myFeed.subscribe({
        lastEventId: "25",
        onOpen: () => console.log('Connection established'),
        onItem: item =>  newItem(item.body),
        onError: error => console.error('Error:', error),
    });

}