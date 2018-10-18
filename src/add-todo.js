import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  search: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    marginTop: '0.75rem',
    marginLeft: '1.25rem'
  }
}

class AddTodo extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const newTask = {
      task: e.target['outlined-task'].value,
      isCompleted: false
    }
    this.props.addTask(newTask)
    e.target.reset()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.search} onSubmit={this.handleSubmit}>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-task"
            label="Enter a New Task"
            margin="dense"
            variant="outlined" />
          <Button
            type="submit"
            className={classes.button}
            variant="fab"
            mini
            color="secondary"
            aria-label="Add">
            <AddIcon />
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(AddTodo)
