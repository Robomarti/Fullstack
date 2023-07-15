import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, refresh }) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '', paddingTop: 10 }
	const showWhenVisible = { display: visible ? '' : 'none', border: 'solid', paddingTop: 10, paddingLeft: 2, borderWidth: 1 }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<>
			<div style={hideWhenVisible} className='onlyTitleAndAuthor'>
				{blog.title}, Author: {blog.author} <button onClick={toggleVisibility}>show</button>
			</div>
			<div style={showWhenVisible} className='allInformation'>
				{blog.title} <button onClick={toggleVisibility}>hide</button>
				<br></br>
				Author: {blog.author}, At: {blog.url}
				<br></br>
				{blog.likes} people have liked this. <button onClick={function(){likeBlog(); refresh()}}>like</button>
				<br></br>
				Posted by: {blog.user.name}
				<br></br>
				<button onClick={function(){deleteBlog(); refresh()}}>delete</button>
				<br></br>
			</div>
		</>
	)
}

export default Blog