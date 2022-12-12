import React from 'react'

const Course = (props) => {
    return(
        <>
            <h1>Full Stack Web Development</h1>
            {props.course.map(x => {
                const {id, name, parts} = x
                let total = 0;
                parts.map(y => {total = total + y.exercises;})
                return (
                    <div key = {id}>
                        <h1>{name}</h1>
                        {parts.map(part => <p key = {part.id}>{part.name} {part.exercises}</p>)}
                        { <p><b>total of {total} exercises</b></p> } 
                    </div>
                )
            })}
        </>
    )
}
export default Course