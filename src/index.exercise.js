// 🐨 make sure to add the comment and import jsx from @emotion/core
// up here so you can use the css prop

// 🐨 let's get a solid reset of global styles so everything looks a bit better
// In this project we're using bootstrap-reset which you can import from
// bootstrap/dist/css/bootstrap-reboot.css
// 🦉 Note: you can definitely use regular styles to style React apps
// and using any modern toolchain will allow you to simply import the CSS file
// but CSS-in-JS is generally easier to maintain.
import '@reach/dialog/styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import VisuallyHidden from '@reach/visually-hidden'
// 🐨 you'll need to import some new components that you'll be creating
// in this file
import {CircleButton, Dialog} from './components/lib'
import {Logo} from './components/logo'

function LoginForm({onSubmit, buttonText}) {
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  // 🐨 this <form> could use a css prop
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        {/*
            🐨 let's make this button look like the rest
            with the styled button component you create in lib
        */}
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

function Modal({button, label, children}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {React.cloneElement(button, {onClick: () => setIsOpen(true)})}
      <Dialog aria-label={label} isOpen={isOpen}>
        {/*
            🐨 this circular button looks better on the right.
            Use the css prop to move it over
            💰 (use flexbox with justify-content: flex-end)
        */}
        <div>
          <CircleButton onClick={() => setIsOpen(false)}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </div>
        {children}
      </Dialog>
    </>
  )
}

function App() {
  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  // 🐨 this div could use a css prop to get its children rendered nicer
  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      {/* 🐨 the two buttons are too close, let's space them out */}
      {/* 🐨 And make sure to use the new Button component for these */}
      <div>
        <Modal label="Login form" button={<button>Login</button>}>
          <h3>Login</h3>
          <LoginForm onSubmit={login} buttonText="Login" />
        </Modal>
        <Modal label="Registration form" button={<button>Register</button>}>
          <h3>Register</h3>
          <LoginForm onSubmit={register} buttonText="Register" />
        </Modal>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
