
let currentPage = 1;
let loadNext = document.getElementById("loadNext");
let loadPrev = document.getElementById("loadPrev");
let totalPages;
let div2 = document.getElementById("div2");
let div3 = document.getElementById("div3");

function getUsers(page){
fetch('https://reqres.in/api/users?page='+ page,{
    method: 'GET'
})
.then(function(response){
    if(response.status !== 200){
        throw response.status; 
    }   
    return response.json();
})
.then(function(responseData){
    const fragment = document.createDocumentFragment();

    responseData.data.forEach(element => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.textContent = element.first_name + " "+ element.last_name + " " + element.email;
        let imgTag = document.createElement("img");
        imgTag.src = element.avatar;
        imgTag.setAttribute("alt", "user-image");



        li.appendChild(imgTag);
        li.appendChild(p);
        fragment.appendChild(li);
    });
    document.getElementById("list").innerHTML = "";
    document.getElementById("list").appendChild(fragment);
    totalPages = responseData.total_pages;

})
.catch(function(error){
    if(error == 404){
        console.log('page not found', error);
    }
    else{
        console.log('server error', error);
    }
})

};

loadPrev.addEventListener("click", function(){
    if(currentPage == 1){
        return;
    }
    currentPage -= 1;
    getUsers(currentPage);  
})

loadNext.addEventListener("click", function(){
    if(currentPage == totalPages){
        return;
    }
    currentPage += 1;
    getUsers(currentPage);
})

getUsers(currentPage);


/////////////////////////////////////////////

let postwrapper = document.getElementById("posts");
let overlay = document.getElementById("overlay");
let postcontent = document.getElementById("postcontent");
let overlayclose = document.getElementById("close");

fetch("https://jsonplaceholder.typicode.com/posts",{
    method: "GET"
})
.then(function(response){
    if(response.status !== 200){
        throw response.status;
    }
    return response.json();
})
.then(function(responseData){
    const fragment = document.createDocumentFragment();

    responseData.forEach(element =>{
        let postdiv = document.createElement("div");
        postdiv.classList.add("post");
        postdiv.setAttribute("data-id", element.id)

        let postid = document.createElement("h2");
        postid.innerText = element.id;

        let posttitle = document.createElement("h3");
        posttitle.innerText = element.title;

        postdiv.appendChild(postid);
        postdiv.appendChild(posttitle);
        postdiv.addEventListener("click", function(event){
            let id = event.target.getAttribute("data-id");
            overlay.classList.add("active");
        })

        postwrapper.appendChild(postdiv);


    })
    overlayclose.addEventListener("click", function(){
        overlay.classList.remove("active");
    })

})
.catch(function(error){
    if(error == 404){
        console.log('page not found', error);
    }
    else{
        console.log('server error', error);
    }
})










