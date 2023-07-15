import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notification, setErrorMessage] = useState(null)
	const addBlogFormRef = useRef()

	useEffect(() => {
		blogService
			.getAll()
			.then(initialBlogs => {
				setBlogs(initialBlogs)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const addBlog = (blogObject) => {
		if (blogs.find(blogs => blogs.title === blogObject.title) === undefined) {
			addBlogFormRef.current.toggleVisibility()
			blogService
				.create(blogObject)
				.then(returnedBlog => {
					setBlogs(blogs.concat(returnedBlog))
					setErrorMessage( `Added '${blogObject.title}'`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
				})
				.catch(error => {
					setErrorMessage(Object.values(error.response.data).flat().join())
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
			//refreshWindow()
		}
		else
		{
			alert(`${blogObject.title} is already added to blogs`)
		}
	}

	const likeBlog = (id) => {
		const blog = blogs.find(b => b.id === id)

		if (blog !== undefined) {
			const changedBlog = { ...blog, likes: (parseInt(blog.likes) + 1).toString() }
			blogService
				.update(id, changedBlog)
				.then(returnedNote => {
					setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedNote))
				})
				.then(() => {
					setErrorMessage( `Liked '${blog.title}'`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
				})
				.catch(error => {
					setErrorMessage(Object.values(error.response.data).flat().join())
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
		}
		else
		{
			alert('That blog is not added to blogs')
		}
	}

	const deleteBlog = (id) => {
		const blog = blogs.find(b => b.id === id)

		if (blog !== undefined) {
			if (window.confirm(`Delete '${blog.title}'`))
			{
				const changedBlog = { ...blog, likes: (parseInt(blog.likes) + 1).toString() }
				blogService
					.deleteBlog(id, changedBlog)
					.then(changedBlog => {
						setErrorMessage( `Deleted '${changedBlog.title}'`)
						setTimeout(() => {
							setErrorMessage(null)
						}, 3000)
					})
					.catch(error => {
						setErrorMessage(Object.values(error.response.data).flat().join())
						setTimeout(() => {
							setErrorMessage(null)
						}, 5000)
					})
			}
		}
		else
		{
			alert('That blog is not added to blogs')
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try
		{
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		}
		catch (exception) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h1>log in to application</h1>
			<div>
				username
				<input
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	function logOut() {
		window.localStorage.removeItem('loggedBlogAppUser')
		refreshWindow()
	}

	function refreshWindow() {
		//window.location.reload()
	}

	const addBlogForm = () => {
		return (
			<Togglable buttonLabel="add blog" ref={addBlogFormRef}>
				<AddBlogForm createBlog={addBlog} user={user}/>
			</Togglable>
		)
	}

	return (
		<div>
			<Notification message={notification} />

			{!user && loginForm()}
			{user &&
				<div>
					<p>{user.name} logged in <button onClick={logOut}>logout</button> </p>
					{addBlogForm()}
					<h2>Blogs</h2>
					<ul>
						{blogs
							.sort((a, b) => b.likes - a.likes)
							.map((blog) =>
								<Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} refresh={() => refreshWindow()} />
							)}
					</ul>
				</div>
			}
		</div>
	)
}

export default App