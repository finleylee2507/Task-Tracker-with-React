import React from 'react'
import {FaTimes} from 'react-icons/fa' //package for icons, imported as a class  

const Task = ({task, onDelete, onToggle}) => {
    return (
        //if the reminder property is true, give it a classname of reminder, else empty 
        //NOTE: classnames with space in between represent two classes 
        <div className={`task ${task.reminder?'reminder':''}`} onDoubleClick={()=>onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color:'red' ,cursor:'pointer'}} onClick={()=>onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
