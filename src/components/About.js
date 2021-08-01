import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h4>Version 1.0.0</h4>
            {/* instead of using an a tag (which will refresh the page), we use link from react router  */}
            <Link to='/'>Go Back</Link>
        </div>
    )
}

export default About
