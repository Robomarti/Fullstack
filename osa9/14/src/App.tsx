interface ContentProps {
  name: string,
  exerciseCount: number
}

const Header = ({ nameOfCourse }: { nameOfCourse: string }): JSX.Element => (
  <h1>{nameOfCourse}</h1>
);

const Content = ({ parts }: { parts: ContentProps[] }): JSX.Element => (
  <div>
      <p>
        {parts[0].name} {parts[0].exerciseCount}
      </p>
      <p>
        {parts[1].name} {parts[1].exerciseCount}
      </p>
      <p>
        {parts[2].name} {parts[2].exerciseCount}
      </p>
  </div>
);

const Total = ({ exerciseAmount }: { exerciseAmount: number }): JSX.Element => (
  <p>Number of exercises {exerciseAmount}</p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header nameOfCourse={courseName} />
      <Content parts={courseParts} />
      <Total exerciseAmount={totalExercises}/>
    </div>
  );
};

export default App;