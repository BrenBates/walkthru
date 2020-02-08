import React from "react";
import {
  Row, Col, Card
} from 'reactstrap';

export class Comment extends React.Component {

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
                  <img alt="user" src={this.props.image}></img>
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

