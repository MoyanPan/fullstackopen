import { useState } from "react";
import blogService from "../services/blogs"
import PropTypes from 'prop-types'
import React from "react";

const Loginform = React.forwardRef(({setMessage,setBlogs,blogs},ref) => {
    const [blog, setBlog] = useState([[],[],[]])
    
    const handleBlogPost = async(event) => {
        event.preventDefault();
        const blogObject = {
          title : blog[0],
          author: blog[1],
          url:blog[2],
          likes:0
        }
        blogService.create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
        setMessage(`a new blog ${blog[0]}! by ${blog[1]} added`)
        setBlog([[],[],[]])
      }

      const handleBlogChange = (number,event) => {
        let copy = [...blog];
        copy[number] = event.target.value;
        setBlog(copy);
      }
    
	return (
        <div>
		<div>
			<h3>create new</h3>
			<form onSubmit={handleBlogPost}>
				<div>
					title:
					<input type="text" required = "required" name="title" value={blog[0]} onChange={(event) => handleBlogChange(0, event)} />
				</div>
				<div>
					author
					<input type="text" required = "required" name="author" value={blog[1]} onChange={(event) => handleBlogChange(1, event)} />
				</div>
				<div>
					url
					<input type="text" required = "required" name="url" value={blog[2]} onChange={(event) => handleBlogChange(2, event)} />
				</div>
                
				<button type="submit">Submit</button>
			</form>

		</div>
        </div>
	);
});
Loginform.prototype = {
  setMessage : PropTypes.func.isRequired,
  setBlogs : PropTypes.func.isRequired,
  blogs : PropTypes.array.isRequired
}

export default Loginform;
