import React from 'react'

const Course = ({ course }) => {
  return (
    <>
    <Header course={course}/>
    <Content course={course}/>
    </>
  )
}

const Header = ({ course }) => {
  return (
    <>
    <h1>
        {course.name}
    </h1>
    </>
  )
}

const Content = ({ course }) => {
  return (
    <>
    {course.parts.map((part) =>
        <Part key={part.id} part={part}/>
    )}
    </>
  )
}

const Part = ({ part }) => {
    return (
      <>
          {part.name} {part.exercises} <br/>
      </>
    )
  }


export default Course