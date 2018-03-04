import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentWillMount() {
    blogService
    .getAll()
    .then(blogs => {
      this.setState( { blogs })
    })

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }    
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: this.state.newBlogAuthor,
      title: this.state.newBlogTitle,
      url: this.state.newBlogUrl
    }

    blogService
    .create(blogObject)
    .then(newBlog => {
      this.setState({
      blogs: this.state.blogs.concat(newBlog),
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: ''
    })
  })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    this.setState({ user: null})

  }


  handleAuthorChange = (event) => {
    this.setState({ newBlogAuthor: event.target.value })
  }

  handleTitleChange = (event) => {
    this.setState({ newBlogTitle: event.target.value })
  }

  handleUrlChange = (event) => {
    this.setState({ newBlogUrl: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    
    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    const loggedInForm = () => (
      <div>
        <p>{this.state.user.name} logged in</p>

        <form onSubmit={this.logout}>
        <button>kirjaudu ulos</button>
        </form>

        <h2>blogs</h2>

        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}

<div>
        <h2> Luo uusi blogi </h2>

        <form onSubmit={this.addBlog}>
        <div>
          Author
        <input
        type='text'
        name='author'
        value={this.state.newBlogAuthor}
        onChange={this.handleAuthorChange}
        />
        </div>
        <div>
          Title
        <input
        type='text'
        name='title'
        value={this.state.newBlogTitle}
        onChange={this.handleTitleChange}
        />
        </div>
        <div>
          Url
        <input
        type='text'
        name='url'
        value={this.state.newBlogUrl}
        onChange={this.handleUrlChange}
        />
        </div>
        <button>Lisää blogi</button>
        </form>
        </div>


      </div>
    )

if (this.state.user === null) {
  return (
    <div>
      {loginForm()}
      </div>
  )
}
return (

  <div>

    {loggedInForm()}
  </div>
)
   
  }
}

export default App;
