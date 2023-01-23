const getFlags = () => {
   return fetch("https://restcountries.com/v3.1/all", {method: "GET"})
        .then(resp => resp.json())        
}


const renderFlags = () => {
    getFlags()
        .then(data => {            
            for (let country of data)
            {
                let imgContainer = renderFlagView(country);
                let infoContainer = renderInfoView(country);

                let container = document.createElement("div");
                container.classList.add("country-container");
                container.appendChild(infoContainer);
                container.appendChild(imgContainer);

                container.onmouseover = async () => {                    
                    container.style.transform = "rotateY(180deg)";
                    container.style.transition = "transform 0.8s";
                                        
                    infoContainer.style.transform = "rotateY(180deg)";
                    infoContainer.style.zIndex = 2;
                    imgContainer.style.zIndex = 1;                    
                    
                }

                container.onmouseleave = () => {                                        
                    container.style = ""
                    infoContainer.style = "";
                    imgContainer.style = "";                    
                }
                
                
                document.getElementById("flags-container").appendChild(container);                
            }
        });
}

const renderInfoView = (country) => {    
    const capital = country.capital?.["0"];
    const region = country.region;
    const subRegion = country.subregion;
    const mainName = country.name.common;    
    const nativeName = !country.name.nativeName ? 
                                country.name.official : 
                                country.name.nativeName[Object.keys(country.name.nativeName)?.[0]]?.official;

    
    const titleEl = document.createElement("p");
    titleEl.classList.add("bold");
    titleEl.textContent = mainName;
    const nativeNameEl = document.createElement("p");    
    nativeNameEl.textContent = `Nome nativo: ${nativeName}`;
    const capitalEl = document.createElement("p");    
    capitalEl.textContent = `Capital: ${capital}`;
    const regionEl = document.createElement("p");    
    regionEl.textContent = `Região: ${region}`;
    const subRegionEl = document.createElement("p");    
    subRegionEl.textContent = `Sub-região: ${subRegion}`;


    const infoContainer = document.createElement("div");
    infoContainer.appendChild(titleEl);
    infoContainer.appendChild(nativeNameEl);
    infoContainer.appendChild(capitalEl);
    infoContainer.appendChild(regionEl);
    infoContainer.appendChild(subRegionEl);
    
    infoContainer.classList.add(region);
    // infoContainer.classList.add("back");
    return infoContainer;
}


const renderFlagView = (country) => {    
    const flagImgUrl = country.flags.png;
    const img = document.createElement("img");
    img.src = flagImgUrl;
    
    const imgContainer = document.createElement("div");
    imgContainer.appendChild(img);

    const region = country.region;
    imgContainer.classList.add(region);
    // imgContainer.classList.add("front");

    return imgContainer;
}

renderFlags();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
