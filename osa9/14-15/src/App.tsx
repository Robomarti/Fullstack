const Header = ({ nameOfCourse }: { nameOfCourse: string }): JSX.Element => (
  <h1>{nameOfCourse}</h1>
);

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => (
  <div>
      <Part coursePart={parts[0]}></Part>
      <Part coursePart={parts[1]}></Part>
      <Part coursePart={parts[2]}></Part>
      <Part coursePart={parts[3]}></Part>
      <Part coursePart={parts[4]}></Part>
  </div>
);

const Total = ({ exerciseAmount }: { exerciseAmount: number }): JSX.Element => (
  <p>Number of exercises {exerciseAmount}</p>
);

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasicBackground extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBasicBackground {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBasicBackground {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBasicBackground {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.kind) {
    case "basic":
      return (<div><b>{coursePart.name}</b> {coursePart.exerciseCount}<br />{coursePart.description}</div>);
    case "group":
      return (<div><b>{coursePart.name}</b>  {coursePart.exerciseCount}<br />{coursePart.groupProjectCount}</div>);
    case "background":
        return (<div><b>{coursePart.name}</b>  {coursePart.exerciseCount}<br />{coursePart.backgroundMaterial}</div>);
    case "special":
        return (<div><b>{coursePart.name}</b>  {coursePart.exerciseCount}<br />{coursePart.requirements}</div>);
    default:
      return assertNever(coursePart);
  }
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
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