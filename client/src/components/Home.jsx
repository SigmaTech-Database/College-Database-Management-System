import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
import './Home.css'

class Home extends Component {
  state = {}
  render() {
    return (
      <div>
        <div className="landing-section">
          <Col md={6}>
            <h2 className="heading-header">SigmaTech</h2>
            <p className="heading-paragraph">
              The modern life of college planning and success made easy.
              <br />
              Accessible and Easy-to-use modern style navigation right at your
              fingertips.
              <br />
              To provide college life success!
            </p>
            <Link to="/signup">
              <Button bsStyle="btn">Get Started Now</Button>
            </Link>
          </Col>
          <Image src="assets/logo/books.png" className="landing-image" />
          <Col md={6} />
        </div>

        <Grid className="about-section">
          <h3 className="text-center about-heading">About</h3>
          <Row className="show-grid text-center" id="about">
            <Col xs={12} sm={6} md={3} className="person-wrapper">
              <Image src="assets/person-1.jpg" circle className="profile-pic" />
              <h3>Jacinta</h3>
              <p>Hello World Hello World Hello World Hello World.</p>
            </Col>

            <Col xs={12} sm={6} md={3} className="person-wrapper">
              <Image src="assets/person-2.jpg" circle className="profile-pic" />
              <h3>Michelle</h3>
              <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem.</p>
            </Col>

            <Col xs={12} sm={6} md={3} className="person-wrapper">
              <Image src="assets/person-3.jpg" circle className="profile-pic" />
              <h3>Alex</h3>
              <p>Ipsum Ipsum Ipsum Ipsum Ipsum Ipsum Ipsum.</p>
            </Col>

            <Col xs={12} sm={6} md={3} className="person-wrapper">
              <Image src="assets/person-4.jpg" circle className="profile-pic" />
              <h3>Vitaliy</h3>
              <p>Bob Ross Bob Ross Bob Ross Bob Ross Bob Ross.</p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Home
