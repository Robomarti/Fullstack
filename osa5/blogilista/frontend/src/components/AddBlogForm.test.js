import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('AddBlogFrom kutsuu takaisinkutsufunktiota oikeilla tiedoilla', async () => {
	const user = userEvent.setup()
	const addBlog = jest.fn()

	render(<AddBlogForm createBlog={addBlog} user={user} />)

	const input1 = screen.getByPlaceholderText('write the title of the blog here')
	const input2 = screen.getByPlaceholderText('write the author of the blog here')
	const input3 = screen.getByPlaceholderText('write the url of the blog here')
	const sendButton = screen.getByText('save')

	await user.type(input1, 'HTML is easy but react is pain')
	await user.type(input2, 'mina')
	await user.type(input3, 'somewhere . com')
	await user.click(sendButton)

	expect(addBlog.mock.calls).toHaveLength(1)
	expect(addBlog.mock.calls[0][0].title).toBe('HTML is easy but react is pain')
})