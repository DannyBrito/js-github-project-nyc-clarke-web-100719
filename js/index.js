const containerList = document.getElementById('user-list')
const repoList = document.getElementById('repos-list')
const formSearch = document.getElementById('github-form')
const USER_LINK = 'https://api.github.com/search/users?q='
const USER_REPOS = 'https://api.github.com/users/'
const REPOS_SEARCH = "https://api.github.com/search/repositories?q="

function getSearch(link,username, fn){
    fetch(link + `${username}`,{
        method: 'GET',
        headers:{Accept:"application/vnd.github.v3+json"}
    })
    .then(res => res.json())
    .then(json =>{
        containerList.innerHTML = ""
        json.items.forEach(fn)
    })
    .catch(err=>console.log(err))
}

const userHTML = user =>{
    const tempHTML =`
    <li data-user-id=${user.id}> <a data-user=${user.login}><img src=${user.avatar_url} style="height:50px;width:50px;"></a>User: <a target="_blank" href=${user["html_url"]}>${user.login}</a>
    </li>
    `
    containerList.innerHTML += tempHTML
}

const repoSearch= repo =>{
    const tempHTML = `<li data-repo=${repo.name}><a target="_blank" href=${repo.html_url}>${repo.name}</a></li>`
    containerList.innerHTML += tempHTML
}

formSearch.addEventListener('click',e =>{
    e.preventDefault()
    if(e.target.type === "submit"){
        if(e.target.value === "user")getSearch(USER_LINK,formSearch.querySelector('#search').value,userHTML);
        else{
            getSearch(REPOS_SEARCH,formSearch.querySelector('#search').value,repoSearch);
        }
    }
    formSearch.reset()
})

containerList.addEventListener('click',e =>{
    // debugger
    if(e.target.localName === "img"){
        e.preventDefault()
            console.log('repo request send')
            getRepos(e.target.parentNode.dataset.user)
        }

})

function getRepos(username){
    fetch(USER_REPOS +`${username}/repos`,{
        method: 'GET',
        headers:{Accept:"application/vnd.github.v3+json"}
    })
    .then(res => res.json())
    .then(json =>{
        repoList.innerHTML = `${username} has ${json.length} repos`
        json.forEach(repoHTML)
    })
    .catch(err=>console.log(err))
}

const repoHTML = repo =>{
    const tempHTML = `<li data-repo=${repo.name}><a target="_blank" href=${repo.html_url}>${repo.name}</a></li>`
    repoList.innerHTML += tempHTML
}