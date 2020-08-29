import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test("renders the blog's title and author, but doesn't render url or likes by default", () => {
  const user = {
    username: 'tuntematon'
  }

  const blog = {
    title: 'testblog7',
    author: 'blogger influencer',
    url: 'http://www.example.com',
    likes: '9001',
    user: {
      username: 'anon'
    }
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  // component.debug()

  const invisibleContent = component.container.querySelector('.togglableContent')

  // testing testing
  expect(component.container).not.toHaveTextContent(
    'ei sinne painkaan'
  )

  // title visible
  expect(component.container).toHaveTextContent(
    'testblog7'
  )

  // author visible
  expect(component.container).toHaveTextContent(
    'blogger influencer'
  )

  // url and likes not visible
  expect(invisibleContent).toHaveStyle('display: none')

})