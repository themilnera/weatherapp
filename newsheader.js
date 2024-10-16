const APIkey = "55544e8739c74061b167676797f006df";
const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${APIkey}`
let articles = [];

fetch(URL)
    .then((response) => response.json())
        .then((jsObject) => {
            makeArticleLinks(jsObject);
        });


function makeArticleLinks(news){
    let articlesElement = document.querySelector(".articles");
    console.log(news);
    for (let i = 0; i < news.articles.length; i++){

        let articleImage = `<img class="article-img" src="${news.articles[i].urlToImage}">`;
        let articleDesc = `<p class="article-desc">${news.articles[i].description}</p>`;
        let articleTitle= `<h2 class="article-h2">${news.articles[i].title}</h2>`;
        if (news.articles[i].urlToImage == null || news.articles[i].urlToImage == undefined){
            articleImage = "";
        }
        if (news.articles[i].description == null || news.articles[i].description == undefined){
            articleDesc = "";
        }

        articlesElement.insertAdjacentHTML("beforeend", `<span id="article${i}" class="article-link">
            
            <a href="#article/${i}" id="article-link${i}">${articleTitle}${articleImage}</a>
        </span>`);

        let selectLink = document.querySelector("#article-link"+i);
        selectLink.addEventListener("click", (e) => {
            e.preventDefault();
            loadArticle(news, i, articlesElement);
        });
    }

    //to make the back and forward buttons work
    window.addEventListener('popstate', () => {
        let hash = window.location.hash;
        if (hash.startsWith('#article/')) {
          let index = hash.split('/')[1];
          loadArticle(news, index, articlesElement);
        }
        else{
            location.reload();
        }
      });
    
}


function loadArticle(news, i, articlesElement){
    window.history.pushState({}, '', `#article/${i}`);

    let published = news.articles[i].publishedAt.split("T");
    let title = news.articles[i].title.split("- ");

    articlesElement.innerHTML = `<div class="full-article"> 
        <span class="fa-img-container"><img class="full-article-img" src="${news.articles[i].urlToImage}"></span>
        <h2 class="full-article-h2">${title[0]}<div class="news-source">(${title[1]})</div></h2>
        <h3 class="full-article-desc">${news.articles[i].description}</h3>
        <p class="full-article-content">${news.articles[i].content.split("[")[0]}</p>
        <a class="full-article-link" href="${news.articles[i].url}">Link to full article</a>
    </div>
    <div class="full-article-footer">
        Article by ${news.articles[i].author} <br>
        Published: ${published[0]} <br>
    </div>
    `
}
