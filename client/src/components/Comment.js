import React from "react";
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button
} from 'reactstrap';

export class Comment extends React.Component {
    constructor(props) {
      super(props);
    }

render() {
    return (

        <div>

        <Card>
          <Row>
            <Col xs="6">
              <Row>
                  <Col xs="6">
                    {this.props.name}
                  </Col>
                  <Col xs="6">
                    <img src={this.props.image}></img>
                  </Col>
              </Row>
            </Col>
            <Col xs="6">
                <p className="commentText">{this.props.text}</p>
            </Col>
          </Row>
        </Card>

        </div>
    )

}

}
  
  export default Comment;

