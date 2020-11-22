import React from 'react'
import { loginUser } from '../../lib/auth' 
import Router from 'next/router'

export default class LoginForm extends React.Component {
    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org',
        error: '',
        isLoading: false
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }
    handleSubmit = e => {
      const { email, password } = this.state;
      e.preventDefault();
      this.setState({ error: '', isLoading: true })
      loginUser( email, password ).then(() => {
        Router.push('/profile');
      })
      .catch(this.showError)
    }

    showError = err => {
      console.error(err)
      const error = err.response && err.response.data || err.message;
      this.setState({ error, isLoading: false })
    }

    render() {
      const { email, password, error, isLoading } = this.state
        return (
            <form className="form-signin" onSubmit={this.handleSubmit} autoComplete="off">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                    onChange={this.handleChange}
                    value={email}
                    type="text" name="email" className="form-control" placeholder="Email address" required autoFocus />
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                    onChange={this.handleChange}
                    value={password}
                    type="password" name="password" className="form-control" placeholder="Password" required />
                <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" disabled={isLoading} type="submit">
                  {isLoading ? 'Sending' : 'Sign in'}
                </button>
                {error && (<div>{error}</div>)}
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
            </form>
        )
    }
}