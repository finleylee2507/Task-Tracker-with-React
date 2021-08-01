import React from 'react'
import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text,setText]=useState('')
    const [day,setDay]=useState('')
    const [reminder,setReminder]=useState('')

    const onSubmit=(e)=>{
        e.preventDefault() //not actually submitting a page 

        if(!text){ //if the task is not set 
            alert('Please add a task')
            return
        }

        onAdd({text,day,reminder})

        //resetting the state so the form is cleared 
        setText('')
        setDay('')
        setReminder(false)
    }
    return (
       <form className='add-form' onSubmit={onSubmit}>

           <div className='form-control'>
               <label htmlFor='task_text'>Task</label>
               <input type='text' id='task_text'value={text} onChange={(e)=>setText(e.target.value)} placeholder='Add Task'></input>
           </div>

           <div className='form-control'>
               <label htmlFor='text_daytime'>Day & Time</label>
               <input id='text_daytime' type='text'
                placeholder='Add Day & Time'
                value={day}
                onChange={(e)=>setDay(e.target.value)}
                ></input>
           </div>

           <div className='form-control form-control-check'>
               <label>Set Reminder</label>
               <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}></input>
           </div>

           <input className='btn btn-block'type='submit' value='Save Task'></input>
       </form>
    )
}

export default AddTask
