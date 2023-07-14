const apiKey = "IFcZyYdvDE-UL4nT40ulwdZ5NN7-n2InUZbzflOLM4k"
const searchBtn = document.getElementById("searchBtn");
let maxImages = 12;
let currentPage = 1;
let lastPage = 0;
searchBtn.onclick = makeSearch;

async function searchUnsplash(searchQuery) {
    const resp = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=${maxImages}&page=${currentPage}&client_id=${apiKey}`);
    
    if(!resp.ok){
        console.log("an error occured" , resp);
        return;
    }
    const data = await resp.json();
    // console.log(data);
    return data;
}
async function makeSearch() {
    const searchQuery = document.getElementById("searchBox").value;
    
    const response = await searchUnsplash(searchQuery);
    console.log(response);

    let htmlcontent = "";

    response.results.forEach((eResp) => {

        const url = eResp.urls.small;
        const unsplashLink = eResp.links.html;
        const photographer = eResp.user.name;
        const photographerPage = eResp.user.links.html;


        // console.log(eResp);
        // console.log(url , unsplashLink , photographer , photographerPage);

        htmlcontent += `
            <div class="card">
                <a href="${unsplashLink}" target="_blank">
                    <div class="result-item" style="background-image : url(${url})"></div>
                </a>
                <p class="photographer-name">
                    <a target="_blank" href="${photographerPage}">Photo by ${photographer}</a>
                </p>    
            </div>
        `;
    });
    lastPage = response.total_pages;
    const imageContainer = document.getElementById("imgContainer");
    imageContainer.innerHTML = htmlcontent;

    const infoPara = document.getElementById("infoPara");
    infoPara.innerText = `About ${response.total} images found`;

    const countInfoPara = document.getElementById("countInfoPara");
    let startPoint = ((currentPage -1) * maxImages)+1;
    let endPoint = maxImages * currentPage;
    countInfoPara.innerText = `${startPoint} - ${endPoint} of page ${currentPage}`;

    updateBtnState();
}

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.onclick = nextPage;
prevBtn.onclick = prevPage; 

function updateBtnState() {
    nextBtn.classList.remove("hidden");
    if(currentPage >= lastPage){
        nextBtn.classList.add("hidden");
    }

    prevBtn.classList.remove("hidden");
    if(currentPage == 1){
        prevBtn.classList.add("hidden");
    }
}

function nextPage() {
    if(lastPage < currentPage)
        return;

    currentPage++;
    makeSearch();
}
function prevPage() {
    if(currentPage == 1) 
        return;
    
    currentPage--;

    makeSearch();
}