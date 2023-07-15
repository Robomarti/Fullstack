import { useState } from 'react'

const AddBlogForm = ({ createBlog, user }) => {
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')
	const [newBlogUrl, setNewBlogUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: newBlogTitle,
			author: newBlogAuthor,
			url: newBlogUrl,
			likes: '0',
			user: user
		})

		setNewBlogTitle('')
		setNewBlogAuthor('')
		setNewBlogUrl('')
	}

	return (
		<form onSubmit={addBlog}>
			<>title: <input id='title' value={newBlogTitle} onChange={event => setNewBlogTitle(event.target.value)} placeholder='write the title of the blog here' /></><br></br>
			<>author: <input id='author' value={newBlogAuthor} onChange={event => setNewBlogAuthor(event.target.value)} placeholder='write the author of the blog here' /></><br></br>
			<>url: <input id='url' value={newBlogUrl} onChange={event => setNewBlogUrl(event.target.value)} placeholder='write the url of the blog here' /></><br></br>
			<button id='save-button' type="submit">save</button>
		</form>
	)
}

export default AddBlogForm