import React, {Component} from 'react'
import Todo from './todo-list'
import AddTodo from './add-todo'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  heading: {
    textAlign: 'center'
  },
  todos: {
    display: 'flex',
    marginLeft: '-5%',
    justifyContent: 'center'
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.updateIsCompleted = this.updateIsCompleted.bind(this)
    this.addTask = this.addTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  deleteTask(e) {
    const { todos } = this.state
    const task = todos.filter(listItem => listItem.id !== parseInt(e.target.id, 10))
    fetch(`/todos/${e.target.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
    this.setState({ todos: task })
  }

  updateIsCompleted(e) {
    const { todos } = this.state
    const todo = todos.find(listItem => listItem.id === parseInt(e.target.id, 10))
    const task = Object.assign({}, todo, {isCompleted: !todo.isCompleted})
    fetch(`/todos/${e.target.id}`, {
      method: 'PATCH',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
      .then(res => res.json())
      .then(todo => {
        const updateStatus = todos.map(task => {
          return todo.id === task.id
            ? todo
            : task
        })
        return updateStatus
      })
      .then(updatedData => {
        this.setState({todos: updatedData})
      })
  }

  addTask(task) {
    const { todos } = this.state
    fetch('/todos', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
      .then(res => res.json())
      .then(todo => this.setState({todos: [...todos, todo]}))
  }

  componentDidMount() {
    fetch('/todos')
      .then(res => res.json())
      .then(todos => this.setState({todos: todos}))
  }

  render() {
    const { todos } = this.state
    const { classes } = this.props
    return (
      <div>
        <h1 className={classes.heading}>Todo List</h1>
        <AddTodo addTask={this.addTask}/>
        <div className={classes.todos}>
          <Todo todos={todos}
            handleUpdate={this.updateIsCompleted}
            handleDelete={this.deleteTask}/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TodoList)
