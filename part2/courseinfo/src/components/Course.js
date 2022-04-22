const Header = ({ course }) => (
    <div>
        <h2>{course}</h2>
    </div>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map((part) => (
            <Part key={part.id} part={part}></Part>
        ))}
    </div>
)

const Total = ({ parts }) => (
    <strong>
        total of {parts.reduce((total, part) => total + part.exercises, 0)}{' '}
        exercises
    </strong>
)

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
    )
}

export default Course
