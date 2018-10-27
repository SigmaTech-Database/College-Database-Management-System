import React, { Component } from 'react'
import { Grid, Col, Image } from 'react-bootstrap'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import './Signup.css'

class Signup extends Component {
  state = {}
  render() {
    return (
      <Router>
        <div className="signup-form">
          <div className="signup__form">
            <div className="PageSwitcher">
              <a href="#" className="PageSwitcher__Item">
                Sign In
              </a>
              <a
                href="#"
                className="PageSwitcher__Item PageSwitcher__Item--Active"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default Signup
