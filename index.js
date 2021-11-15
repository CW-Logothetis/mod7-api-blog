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
    
    document.addEventListener('DOMContentLoaded', ()=>{
    
        // 1. fetch API
        
        function fetchData() {
            fetch("https://apis.scrimba.com/jsonplaceholder/posts")
            .then( resp => resp.json())
            .then( data => renderBlogPosts(data.slice(0,10)))
        }
        
        // 2. function to render and style blog posts with fetched data
        
        function renderBlogPosts(data) {
            
            for (const post of data) {
                
            // save the HTML element where all the blog posts will live    
                
                const blogUL = document.getElementById("blog-list")
                
            // create new HTML elements
            
                const blogLi = document.createElement('li')
                const blockQuote = document.createElement('blockquote')
                const title = document.createElement('h3')
                const p = document.createElement('p')
                // const br = document.createElement('br')
                const hr = document.createElement('hr')
    
            // add classes and ID for styling. Allow for data-* and dataset
    
                blogLi.className = 'blog-card'
                blockQuote.className = 'blockquote'
                title.className = 'blockquote-title'
                // p.className = 'mb-0' // this is bootstrap, which i'm not using at the mo. Just use p
                blogLi.dataset.id = post.id
            
            // grab data from fetch and insert it into the created HTML elements
            
                title.innerHTML = post.title
                p.innerHTML = post.body
            
            // add everything to the ul inside index.html with append()
            
                blogUL.append(blogLi)
                blogLi.append(title, hr, blockQuote)
                blockQuote.append(p)
                
            }
        }
        
            // 3. call fetchData to run renderBlogPost on page load
        
            fetchData()
        })
        
    