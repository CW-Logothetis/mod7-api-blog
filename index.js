/**
 * Original code from Scrimba
 * 
 * fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        const postsArr = data.slice(0, 5)
        let html = ""
        for (let post of postsArr) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        document.getElementById("blog-list").innerHTML = html
    })
    */
    
    // BELOW adapted from https://medium.com/@johnwadelinatoc/manipulating-the-dom-with-fetch-7bfddf9c526b
    
// MDN: 'The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, 
// without waiting for stylesheets, images, and subframes to finish loading.'
// In effect, start fetching once HTML is loaded, cos it needs the `ul` to be there, but don't need to wait for CSS and images.



//////////////////////////////////////////        
// 1. fetch to GET the placeholder data //
////////////////////////////////////////// 

document.addEventListener('DOMContentLoaded', ()=>{

function fetchData() {
    fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then( resp => resp.json())
    .then( data => renderBlogPosts(data.slice(0,10)))
}

// 1a. function to render and style blog posts with fetched data

function renderBlogPosts(data) {
    
    // save the HTML element - an unordered list - where all the blog posts will live

    const blogUL = document.getElementById("blog-list")

    // loop through the `data`, creating elements and applying styling for each `post`
    for (const post of data) {
        
        // const blogUL = document.getElementById("blog-list")
        
    // create new HTML elements
    
        const blogLi = document.createElement('li')  // one li for each post
        const title = document.createElement('h3')
        const hr = document.createElement('hr')
        const blockQuote = document.createElement('blockquote') // HTML element especially for putting quotes in blocks
        const p = document.createElement('p')
        // const br = document.createElement('br')
        

    // add classes and ID for styling.
    // Allow for data-* and dataset - to store any extra information that doesn't have any visual representation e.g. the post id
    // Note: data attributes may not be accessed by assistive tech and search crawlers.

        blogLi.className = 'blog-card'
        title.className = 'blockquote-title'
        blockQuote.className = 'blockquote'
        // p.className = 'mb-0' // this is bootstrap, which i'm not using at the mo. Just use p
        blogLi.dataset.id = post.id
    
    // grab data from fetch and insert it into the created HTML elements
    // Note: for `post.NAME`, first need to log data to know that API names it title and body
    
        title.innerHTML = post.title
        p.innerHTML = post.body
    
    // add everything to the ul inside index.html with append()
    
        blogUL.append(blogLi)
        blogLi.append(title, hr, blockQuote)
        blockQuote.append(p)
        
    }
}

    // 1b. call fetchData to run renderBlogPost on page load

    fetchData()
})
        
///////////////////////////        
// 2. POST new blog post //
/////////////////////////// 

// 2a. listen to form for a submit and save input in an object
const form = document.getElementById("new-post")

form.addEventListener('submit', function(e) {

    e.preventDefault() // stops page refreshing on submit
    const postTitle = document.getElementById("post-title").value
    const postBody = document.getElementById("post-body").value
    const data = {
        title: postTitle, // again, title and body must match what server has for keys
        body: postBody
    }
    console.log(data)

// 2b. POST above object - data

const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts", options) 
    .then( resp => resp.json())
    .then( post => {
        const blogUL = document.getElementById("blog-list")
        const blogLi = document.createElement('li')  // one li for each post
        const title = document.createElement('h3')
        const hr = document.createElement('hr')
        const blockQuote = document.createElement('blockquote') // HTML element especially for putting quotes in blocks
        const p = document.createElement('p')
        blogLi.className = 'blog-card'
        title.className = 'blockquote-title'
        blockQuote.className = 'blockquote'
        // p.className = 'mb-0' // this is bootstrap, which i'm not using at the mo. Just use p
        blogLi.dataset.id = post.id
        title.innerHTML = post.title
        p.innerHTML = post.body
        blogUL.append(blogLi)
        blogLi.append(title, hr, blockQuote)
        blockQuote.append(p)
    })

})