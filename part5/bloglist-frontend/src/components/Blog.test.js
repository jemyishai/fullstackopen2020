import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


beforeEach(function () {
  localStorage.setItem('loggedBlogAppUser', JSON.stringify({username: 'another_DELETY'}))

})


test('renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title: "NEW Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
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

test('checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', ()=>{

  const blog = {
    title: "NEW Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 15,
    user:{
      username: 'Jess'
    }
  }

  //not being used?
  // const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
  )

  // 15 as a value does not work
  // expect(component.container).toHaveValue(15)

  expect(component.container).toHaveTextContent(15)

})

test('if the like button is clicked twice, the event handler the component received as props is called twice', ()=>{

  const blog = {
    title: "NEW Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 15,
    user:{
      username: 'Jess'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeAdd={mockHandler}/>
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
