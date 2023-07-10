const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

test('all the blogs are returned and as json', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all the blogs are identified by id', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
	expect(response.body[1].id).toBeDefined()
})

test('there are three blogs after adding one', async () => {
	const newBlog = {
		title: 'test',
		author: 'mina',
		url: '',
		likes: '0'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('there are only two blogs after adding one without title', async () => {
	const newBlog = {
		title: '',
		author: 'mina',
		url: '',
		likes: '0'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('there are three blogs after adding one without likes', async () => {
	const newBlog = {
		title: 'zeroLikes',
		author: 'mina',
		url: '',
		likes: ''
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('a specific blog can be viewed', async () => {
	const blogsAtStart = await helper.blogsInDb()

	const blogToView = blogsAtStart[0]

	const resultBlog = await api
		.get(`/api/blogs/${blogToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length - 1
	)

	const ids = blogsAtEnd.map(r => r.id)

	expect(ids).not.toContain(blogToDelete.id)
})

test('an unsaved blog can not deleted', async () => {
	const blogToDelete 	= {
		title: 'Unreal',
		author: 'mina',
		url: '',
		likes: '0'
	}

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length
	)
})

afterAll(async () => {
	await mongoose.connection.close()
})