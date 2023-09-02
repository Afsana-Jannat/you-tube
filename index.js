const handleCategory = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  tabContainer.textContent = ``;
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick="handleLoadvideos('${category.category_id}')" 
        class="tab border-solid border-2 mx-1 hover:bg-red-500 hover:text-white">${category.category}
        </a>
        `
    tabContainer.appendChild(div)
  });

};

const handleLoadvideos = async (categoriId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoriId}`);
  const data = await response.json();
  const videosContainer = document.getElementById("videos-container");
  videosContainer.textContent = ``;
  const imageContainer = document.getElementById("imageContainer");

  if(data.data.length == 0){
    imageContainer.src = "Icon.png";
    imageContainer.style.display ="block"
    return;
  }
  else{
    imageContainer.style.display ="none"
  }
  // console.log(categoriId)
  data.data?.forEach((videos) => {
    
    console.log(videos);
    const div = document.createElement("div");
    
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl my-4">
            <figure>
            <div>
            <img class="w-86 h-40 mt-2"
             src=${videos?.thumbnail}/>
             </div>
            </figure>
            <div class="card-body">
              <h2 class="card-title">${videos?.title}</h2>
              <div class="flex">
              <img class="w-12 h-12 rounded-full"
              src=${videos?.authors[0]?.profile_picture}/>
              <p class="font-bold mx-2 mt-2">${videos?.authors[0]?.profile_name}</p>
              </div> 
              <p>${videos?.others?.views} views</p>
              <span>${videos?.others?.posted_date}</span>
            </div>
          </div>
        `

    videosContainer.appendChild(div)
   

  })
   
  }
handleCategory()
handleLoadvideos("1000");
