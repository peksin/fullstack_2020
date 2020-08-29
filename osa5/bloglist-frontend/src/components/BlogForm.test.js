import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the callbackfuntion with correct values', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleCreateBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'tosiblogi'}
  })

  fireEvent.change(author, {
    target: { value: 'totinen torvensoittaja'}
  })

  fireEvent.change(url, {
    target: { value: 'www.seriousblogisserious.com'}
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  // console.log(`${JSON.stringify(createBlog.mock.calls[0][0])}`) 
  expect(createBlog.mock.calls[0][0].title).toBe('tosiblogi')
  expect(createBlog.mock.calls[0][0].author).toBe('totinen torvensoittaja')
  expect(createBlog.mock.calls[0][0].url).toBe('www.seriousblogisserious.com')
  
})