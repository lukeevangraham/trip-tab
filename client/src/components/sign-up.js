import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        console.log('sign-up handleSubmit, username: ')
        console.log(this.state.username)
        event.preventDefault()

        //request to server to add a new username/password
        axios.post('/user/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (!response.data.errmsg) {
                    console.log('successful signup')
                    this.setState({ //redirect to login page
                        redirectTo: '/login',
                        message: "Successfully Signedup"
                    })
                } else {
                    console.log('username already taken')
                }
            }).catch(error => {
                console.log('signup error: ')
                console.log(error)

            })
    }


    render() {
        return (
            <div className="SignupForm col-xs-11 col-md-5 bg-light p-3 rounded mx-auto login-container">
                <h4 className="mb-3 text-center">Sign up</h4>
                <form className="form-horizontal">
                    <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="username">Username</label>
                        <div className="col-sm-9">
                            <input className="form-input form-control"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="password">Password: </label>
                        <div className="col-sm-9">
                            <input className="form-input form-control"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group float-right pr-3 mb-0 row">
                        <button
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                            type="submit"
                        >Sign up</button>
                    </div>
                    <div>
                        <h2>{this.state.message}</h2>
                    </div>
                </form>
            </div>

        )
    }
}

export default Signup
