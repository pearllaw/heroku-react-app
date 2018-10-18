import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import React from 'react'

export default function Todo({todos, handleUpdate, handleDelete}) {
  return (
    <List>
      {todos.map(todo => {
        return <ListItem key={todo.id}>
          <Checkbox
            id={todo.id.toString()}
            checked={todo.isCompleted}
            onClick={handleUpdate} />
          <ListItemText
            primary={todo.isCompleted === false
              ? todo.task
              : <s>{todo.task}</s>}
          />
          {todo.isCompleted === true &&
            <i className="fas fa-times"
              id={todo.id}
              style={{color: 'red'}}
              onClick={handleDelete}></i>
          }
        </ListItem>
      })}
    </List>
  )
}
