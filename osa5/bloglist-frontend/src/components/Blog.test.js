import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog
  let user


  beforeEach(() => {
    user = {
      username: 'tuntematon'
    }

    blog = {
      title: 'testblog7',
      author: 'blogger influencer',
      url: 'http://www.example.com',
      likes: '9001',
      user: {
        username: 'anon'
      }
    }

    component = render(
      <Blog blog={blog} user={user} />
    )
  })


  test("renders the blog's title and author, but doesn't render url or likes by default", () => {
    const invisibleContent = component.container.querySelector('.togglableContent')
  
    expect(component.container).not.toHaveTextContent(
      'ei sinne painkaan'
    )
  
    expect(component.container).toHaveTextContent(
      'testblog7'
    )
  
    expect(component.container).toHaveTextContent(
      'blogger influencer'
    )
  
    // url and likes not visible
    expect(invisibleContent).toHaveStyle('display: none')
  })

  test("renders blog's title, author, url and likes when view-button is pressed", () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

