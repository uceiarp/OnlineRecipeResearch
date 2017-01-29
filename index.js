var APP_ID = "6cc6df33-1f71-48d0-9868-e1de48b64467";

var app = new PusherPlatform.App({
    appId: '6cc6df33-1f71-48d0-9868-e1de48b64467',
});

var myFeed = app.feed('recipeResearch');

load();

function addNewIdeaToList(newRecipeName,  SEND_AGAIN) {

    var newRecipeName = document.getElementById("newRecipe").value;
    var newRecipeLink = document.getElementById("recipeLink").value;

    var newRecipe = {
        name: newRecipeName,
        link: newRecipeLink
    };

    if (SEND_AGAIN) {
        myFeed.append(newRecipe)
            .then(function(response) {
                console.log("Success" + newRecipe);
                console.log(response)
            })
            .catch(err => console.error('Error:', err));

        myFeed.append({ yourKey: APP_ID, message: newRecipe})
            .then(response => console.log('Success:', response))
            .catch(err => console.error('Error:', err));
    }


}

function newItem(newItem) {

    console.log(JSON.stringify(newItem));

    if (typeof newItem.name === "string" && typeof newItem.link === "string") {
        var recipeName = newItem.name;
        var recipeLink = newItem.link;

        var recipeNameTextNode = document.createTextNode("Name: " + recipeName + "    ");
        var createLink = document.createElement("a");
        createLink.href = recipeLink;
        createLink.text = "Link: " + recipeLink;
        createLink.style.marginLeft = "30px;";

        var createListElement = document.createElement("li");
        createListElement.appendChild(recipeNameTextNode);
        createListElement.appendChild(createLink);

        document.getElementById("recipeList").appendChild(createListElement);

        // Delete textbox content
        document.getElementById("newRecipe").value = "";
        document.getElementById("recipeLink").value = "";

        console.log("Name: " + recipeName);
        console.log("Link: " + recipeLink);
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