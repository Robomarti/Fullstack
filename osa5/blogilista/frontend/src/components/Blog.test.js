import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Togglable />', () => {
	let container

	test('renderöi titlen ja authorin muttei urlia ja likejen määrää', () => {
		const blog = {
			id: '1',
			title: 'HTML is easy',
			author: 'mina',
			url: 'mun nettisivu .com',
			likes: '0',
			user: 'jotain'
		}

		const likeBlog = () => {

		}

		const deleteBlog = () => {

		}

		const refreshWindow = () => {

		}

		container = render(<Blog blog={blog} likeBlog={() => likeBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} refresh={() => refreshWindow()} />).container

		const div = container.querySelector('.onlyTitleAndAuthor')
		expect(div).not.toHaveStyle('display: none')
		const div2 = container.querySelector('.allInformation')
		expect(div2).toHaveStyle('display: none')
		const likes = screen.queryByText('0')
		const url = screen.queryByText('mun nettisivu .com')
		expect(likes).toBeNull()
		expect(url).toBeNull()
	})

	test('renderöi titlen, authorin, urlia ja likejen määrän nappia painettaessa', async () => {
		const blog = {
			id: '1',
			title: 'HTML is easy',
			author: 'mina',
			url: 'mun nettisivu .com',
			likes: '0',
			user: 'jotain'
		}

		const likeBlog = () => {

		}

		const deleteBlog = () => {

		}

		const refreshWindow = () => {

		}

		container = render(<Blog blog={blog} likeBlog={() => likeBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} refresh={() => refreshWindow()} />).container

		const user = userEvent.setup()
		const button = screen.getByText('show')
		await user.click(button)

		const div = container.querySelector('.onlyTitleAndAuthor')
		expect(div).toHaveStyle('display: none')
		const div2 = container.querySelector('.allInformation')
		expect(div2).not.toHaveStyle('display: none')
		const likes = screen.findByText('0')
		const url = screen.findByText('mun nettisivu .com')
		expect(likes).toBeDefined()
		expect(url).toBeDefined()
	})

	test('jos like nappia painetaan kahdesti, kutsutaan liketys funktiota kahdesti', async () => {
		const blog = {
			id: '1',
			title: 'HTML is easy',
			author: 'mina',
			url: 'mun nettisivu .com',
			likes: '0',
			user: 'jotain'
		}

		const likeBlog = jest.fn()

		const deleteBlog = () => {

		}

		const refreshWindow = () => {

		}

		container = render(<Blog blog={blog} likeBlog={likeBlog} deleteBlog={() => deleteBlog(blog.id)} refresh={() => refreshWindow()} />).container

		const user = userEvent.setup()
		const button = screen.getByText('like')
		await user.click(button)
		await user.click(button)

		expect(likeBlog.mock.calls).toHaveLength(2)
	})
})