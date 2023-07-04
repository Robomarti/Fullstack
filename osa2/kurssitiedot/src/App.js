const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} parts={part} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  const exes = parts.map(part => part.exercises)
  return (
    <>
      <p>Number of exercises {exes.reduce((a, b) => a + b, 0)}</p>
    </>
  )
}

const Part = ({parts}) => {
  return (
    <>
      <p>
        {parts.name} {parts.exercises}
      </p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App