import { useState } from "react";
import axios from "axios";
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(true);
	const [likes, setLikes] = useState(blog.likes ? blog.likes : 0)
	const hideWhenVisible = { display: visible ? "none" : "" };
	const toggleVisibility = () => {
		setVisible(!visible);
	};
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
		margin: 0,
	};
	const updatebloglikes = async () => {
		var axios = require("axios");
		var data = JSON.stringify({
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: likes +1
		});

		var config = {
			method: "post",
			url: "http://localhost:3003/api/blogs/update",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
				setLikes(likes + 1)
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const deleteblog = async () => {
		if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`) == true ){
			const token = JSON.parse(window.localStorage.getItem('loggedNoteappUser')).token
			console.log(token)
			blogService.deleteblog(blog.id,token)
			window.location.reload()
		}
	}

	return (
		<div style={blogStyle}>
			<b>
				<p>
					title :{blog.title} <button onClick={toggleVisibility}>show</button>
				</p>
				<div style={hideWhenVisible}>
					<p>author :{blog.author}</p>
					<p>url :{blog.url}</p>
					<p>
						likes :{likes}
						<button onClick={() => updatebloglikes()}>Like</button>
					</p>
					<button onClick={() => deleteblog()}>Delete</button>
				</div>
			</b>
		</div>
	);
};

export default Blog;
