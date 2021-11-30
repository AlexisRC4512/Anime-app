export default function SearchHero(btn1){
    const d=document;
    d.addEventListener('click',(e)=>{
       if(e.target.matches(btn1)){
          const  base_url  =  "https://api.jikan.moe/v3"
         let Anime=d.getElementById("Anime").value;
         const result=document.getElementById("res");

              fetch(`${base_url}/search/anime?q=${Anime}&page=1`)
              .then(res=>res.json())
              .then(updateDom)
              .catch(err=>console.warn(err.message));
          
         function updateDom(data){
            console.log(data.results)
           const animeByCategories = data.results
                .reduce((acc, Anime)=>{
        
                    const {type} = Anime;
                    if(acc[type] === undefined) acc[type] = [];
                    acc[type].push(Anime);
                    return acc;
        
                }, {});
        
                result.innerHTML = Object.keys(animeByCategories).map(key=>{
        
                    const animesHTML = animeByCategories[key]
                    .map(anime=>{
                        return `
                            <div class="Target col-12 col-lg-3 m-1">
                                    <img src="${anime.image_url} class="img-fluid">
                                <div class="Target-content">
                                    <span class="Target-title">${anime.title}</span>
                                    <p>${anime.synopsis}</p>
                                </div>
                                <div class="target-action">
                                    <a href="${anime.url}">Find out more</a>
                                </div>
                            </div>
                        `
                    }).join("");
        
                    return `
                        <section>
                            <h2 class=" mb-4">${key.toUpperCase()}</h2>
                            <div class="col-12 row">${animesHTML}</div>
                        </section>
                    `
                }).join("");
        }
        
         
       }
    })
}