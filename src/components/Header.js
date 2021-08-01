import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router' //used to check the current location 

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation() //the current window location 

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

//specify types
Header.propTypes = {
    title: PropTypes.string.isRequired,
}
export default Header
