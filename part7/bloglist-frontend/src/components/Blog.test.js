import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogDetails from './BlogDetails'
import CreateNewBlog from './CreateNewBlog'

beforeEach(function () {
  localStorage.setItem('loggedBlogAppUser', JSON.stringify({ username: 'another_DELETY' }))

})

test('renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title: 'NEW Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    user:{
      username: 'Jess'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'NEW Go To Statement Considered Harmful'
  )

  expect(component.container).toHaveTextContent(
    'Edsger W. Dijkstra'
  )

  expect(component.container).not.toHaveTextContent('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')

  expect(component.container).not.toHaveValue(15)
})

test('checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {

  const blog = {
    title: 'NEW Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    user:{
      username: 'Jess'
    }
  }

  //not being used?
  //const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  )

  // 15 as a value does not work
  // expect(component.container).toHaveValue(15)

  expect(component.container).toHaveTextContent(15)
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const blog = {
    title: 'NEW Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    user:{
      username: 'Jess'
    }
  }

  const mockHandler = jest.fn()
  const mockHandler2 = jest.fn()


  const component = render(
    <BlogDetails blog={blog} likeAdd={mockHandler} removeBlog={mockHandler2}/>
  )

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('should check, that the form calls the event handler it received as props with the right details when a new blog is created', () => {

  const mockHandler = jest.fn()
  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()


  const component = render(
    <CreateNewBlog handleSubmit={mockHandler} newBlog={mockHandler1}
      setNewBlog={mockHandler2}
    />
  )

  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(url, {
    target: { value: 'https://www.ilovetests.com' }
  })
  fireEvent.change(title, {
    target: { value: 'Everyone loves tests' }
  })
  fireEvent.change(author, {
    target: { value: 'Jester' }
  })

  fireEvent.submit(form)

  expect(mockHandler2.mock.calls).toHaveLength(3)

  expect(mockHandler2.mock.calls[0][0]['url']).toBe('https://www.ilovetests.com')
  expect(mockHandler2.mock.calls[1][0]['title']).toBe('Everyone loves tests')
  expect(mockHandler2.mock.calls[2][0]['author']).toBe('Jester')

})





