const dummy = (blogs) => {
    return 1;
  }
const totalLikes = (blogs) => {
    return blogs[0].likes;
}
const favoriteBlog = (blogs) => {
    let name = blogs[0];
    for(let x in blogs){
        if(blogs[x].likes > name.likes){
            name = blogs[x]
        }
    }

    return ({title: name.title,
    author: name.author,
    likes: name.likes,});
}

const mostBlogs = (blogs) =>{
    let alist = [];
    let authcount = [];
    for(x in blogs){
        if(alist.includes(blogs[x].author)){
            const index = alist.indexOf(blogs[x].author);
            authcount[index] += 1;
        }else{
            alist.push(blogs[x].author);
            authcount.push(1);
        }
    }
    
    let index = authcount.indexOf(Math.max.apply(Math,authcount))
    let almost = {author:alist[index],blogs:authcount[index]}
    return almost;
}

const mostLikes = (blogs) => {
    let mostlikes = {author : null, likes : 0}
    for (x in blogs){
        if(blogs[x].likes >= mostlikes.likes){
            mostlikes.author = blogs[x].author;
            mostlikes.likes = blogs[x].likes
        }
    }
    return mostlikes
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }