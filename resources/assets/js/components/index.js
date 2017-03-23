import React from 'react';
import ReactDOM from 'react-dom';

class TodoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: '',
      desc: '',
      todos: [],
      done: []
    };
    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.todoDone = this.todoDone.bind(this);
    this.todoDelete = this.todoDelete.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    return axios.get('/api/todos').then(resp => {
      this.setState({
        todos: resp.data
      })
    }).catch(err =>{
      // Left todo: handle error
      console.log('error: ', err);
    })
  }

  addTodo(e) {
    e.preventDefault();
    return axios.post('/api/todos', {
      title: this.state.todo,
      description: this.state.desc
    }).then(resp => {
      this.setState({
        todos: [...this.state.todos, resp.data],
        todo: '',
        desc: ''
      });
    }).catch((err) => {
       // Left todo: handle error
      console.log('err'. error)
    })
  }

  todoDone(e) {
    console.log('e done', e.target);
    console.log('e done', e.target.value);
    return axios.delete(`/api/todos/${e.target.value}`).then(resp => {
       // Left todo: handle resp
      console.log('resp: ', resp);
    }).catch(err => {
      // Left todo: handle error
      console.log('err'. error)
    });
  }

  todoDelete(e) {
    return axios.delete(`/api/todos/delete/${e.target.value}`).then(resp => {
      // Left todo: handle resp
      console.log('resp force delete', resp);
    }).catch(err => {
      // handle error
      console.log('err: ', err);
    });
  }

  handleChange(e) {
    this.setState({
      todo: e.target.value
    });
  }

  handleTextChange(e) {
    this.setState({
      desc: e.target.value
    })
  }

  renderTodos() {
    // notDone = this.state.todos.filter(todo => !todo.deleted_at);
    return <ul>
      {this.state.todos.map(todo => {
        return <li key={todo.id} className="todo-list">
          <label onClick={this.todoDone} className="todo-label">
            <input type="checkbox" value={todo.id} />
            {todo.title} - {todo.description}
          </label>
          <span onClick={this.todoDelete}>x</span>
        </li>;
      })}
    </ul>;

  }

  renderAddForm() {
    return <form className="add-form" onSubmit={this.addTodo}>
      <input className="add-todo" placeholder="Add Todo" onChange={this.handleChange} />
      <textarea className="add-description" onChange={this.handleTextChange}></textarea>
      <button className="btn btn-md btn-primary add-btn"> Add </button>
    </form>;
  }
  render() {
    return (
      <div> React!!
        {this.renderAddForm()}

        {this.renderTodos()}
      </div>
    );
  }
}

export default TodoContainer;

if (document.getElementById('react-app')) {
  ReactDOM.render(
    <TodoContainer />,
    document.getElementById('react-app')
  );
}