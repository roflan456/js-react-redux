import React,{useContext}  from 'react'
import PropTypes from 'prop-types'
import Context from '../Context'

const styles = {
    li: {
        display:'flex' ,
        justifyContent:'space-between',
        alignItems:'center',
        padding:'.5rem 1rem',
        marginBottom:'.5rem',
        border:'1px solid #ccc',
        borderRadius:'4px'
    },
    input:{
        marginRight:'1rem'
    }
}

function TodoItem(props){
    const {removeTodo} = useContext(Context)
    const line = []

if(props.todo.completed === true){
    line.push('done')
}
    return (
        <li style={styles.li}>
            <span className={line.join(' ')}>
                <input checked={props.todo.completed}type='checkbox' style={styles.input} onChange={() => props.onChange(props.todo.id)}/>
                <strong>{props.index + 1}</strong>
                &nbsp;
                {props.todo.title}
            </span>
            <button className='rm' onClick={ removeTodo.bind(null, props.todo.id)}>&diams;</button>
            
        </li>
    )
}

TodoItem.propTypes = {
    todo:PropTypes.object.isRequired,
    index:PropTypes.number,
    onChange:PropTypes.func.isRequired
}

export default TodoItem