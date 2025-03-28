const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Part = ({ parts }) => {
  return (
    <div>
      <p>
        {parts.name} {parts.exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part parts={parts[0]} />
      <Part parts={parts[1]} />
      <Part parts={parts[2]} />
    </div>
  );
};

const Number = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Number parts={course.parts} />
    </div>
  );
};

export default App;
