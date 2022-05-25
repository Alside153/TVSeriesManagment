var url = "https://api.tvmaze.com/shows";

async function getShows() {
        var resp = await fetch(url);

    if (resp.ok) {
        var users = await resp.json();
        users = users.slice(0,3);

        console.log(users);

        
        var bodyObj = document.getElementById("mainTr");
        var createObj = document.getElementById("createTr");

        var tr = document.createElement("table");
        tr.border = 1;

        //HEADERS for the Table
        var trRow = document.createElement("tr");

        var tdDataId = document.createElement("td");
        var tdDataName = document.createElement("td");
        var tdDataGenres = document.createElement("td");
        var tdDataImage = document.createElement("td");
        var tdDataEdit = document.createElement("td");
        var tdDataDelete = document.createElement("td");

        tdDataId.innerHTML = "Id";
        tdDataName.innerHTML = "Name";
        tdDataGenres.innerHTML = "Genre";
        tdDataImage.innerHTML = "Image";
        tdDataEdit.innerHTML = "Edit";
        tdDataDelete.innerHTML = "Delete";
        

        trRow.append(tdDataId, tdDataImage, tdDataName, tdDataGenres, tdDataEdit, tdDataDelete);
        tr.appendChild(trRow);

        //creating the table
        users.forEach((user) => {

            var trRow = document.createElement("tr");

            var tdDataId = document.createElement("td");
            var tdDataName = document.createElement("td");
            var tdDataGenres = document.createElement("td");
            var tdDataEdit = document.createElement("td");
            var tdDataDelete = document.createElement("td");
            var tdDataImage = document.createElement("td");

            var img = document.createElement("img");
            var delButton = document.createElement("button");
            var editButton = document.createElement("button");


            tdDataId.innerHTML = user.id;
            tdDataName.innerHTML = user.name;
            tdDataGenres.innerHTML = user.genres;

            img.src = user.image.medium;
            img.width = 50;
            img.height = 50;

            delButton.innerHTML= "Delete";
            delButton.onclick = function() {delFunc(user)};
            editButton.innerHTML = "Edit";
            editButton.onclick = function() {html2(user)};

            tdDataEdit.append(editButton);
            tdDataDelete.append(delButton);
            tdDataImage.append(img);

            trRow.append(tdDataId, tdDataImage, tdDataName, tdDataGenres, tdDataEdit, tdDataDelete);
            tr.appendChild(trRow);
        })
        //creating the 'Create' button
        var createButton = document.createElement("button");
        
        createButton.innerHTML= "Create";
        createButton.onclick = function() {createNew()};
        createObj.append(createButton);
    }


    bodyObj.appendChild(tr);

}
function createNew() {


    window.location.href = "html3.html";
}

async function addShow() {


    var arr = {
            id: "",
            name: "",
            rating:{
                average: ""
            },
            type: "",
            runtime: "",
            language: "",
            image:{
                medium: ""
            },
            genres: ""

    }

    arr.name = document.getElementById("Name").value;
    arr.rating.average = document.getElementById("Rating").value;
    arr.type = document.getElementById("Type").value;
    arr.runtime = document.getElementById("RunTime").value;
    arr.language = document.getElementById("Language").value;
    arr.image.medium = document.getElementById("Image").value;
    arr.genres = document.getElementById("Genres").value;

    console.log(arr);

    // var resp = await fetch(url, {
    //             method: "POST",
    //             body: JSON.stringify(arr),
    //             headers: { "content-type": "application/json" }
    //         })

    //         if (resp.ok === true) {
    //             var data = await resp.json();
    //             console.log(data);
    //         }

    window.location.href = "html1.html";
}

function html2(id) {

    sessionStorage.setItem('EditUser',JSON.stringify(id));

    window.location.href = "html2.html";
}

function setShow() {
    var arr = JSON.parse(sessionStorage.getItem('EditUser'));
    
    document.getElementById("Name").value = arr.name;
    document.getElementById("Rating").value = arr.rating.average;
    document.getElementById("Type").value = arr.type;
    document.getElementById("RunTime").value = arr.runtime;
    document.getElementById("Language").value = arr.language;
    document.getElementById("Image").value = arr.image.medium;
    document.getElementById("Genres").innerHTML = arr.genres;

}

async function editShow() {
    var arr = JSON.parse(sessionStorage.getItem('EditUser'));

    arr.name = document.getElementById("Name").value;
    arr.rating.average = document.getElementById("Rating").value;
    arr.type = document.getElementById("Type").value;
    arr.runtime = document.getElementById("RunTime").value;
    arr.language = document.getElementById("Language").value;
    arr.image.medium = document.getElementById("Image").value;
    arr.genres = document.getElementById("Genres").innerHTML;

    console.log(arr);

    // var resp = await fetch(url + "/" + arr.id, {
    //             method: "put",
    //             body: JSON.stringify(arr),
    //             headers : { "content-type": "application/json" }
    //         })
    //         if(resp.ok){
    //             var data = await resp.json();
    //             console.log(data);
    //         }
        

    window.location.href = "html1.html";
}

async function delFunc(id) {
    console.log("delFunc called :", id);
    
    // var resp = await fetch(url + "/" + id, {
    //     method: "delete"
    // });

    // console.log(resp);

    // if (resp.status === 200) {
    //     var data = await resp.json();
    //     console.log(data);
    // }

    getShows();

}