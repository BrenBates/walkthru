import React from "react";
import "../Comment/comment.css";
import {
  Row, Col, Card
} from 'reactstrap';

export class Comment extends React.Component {

  render() {
    return (
      <div>
        <Card className="comment-card-container">
          <Row className="comment-row">
            <Col className="col-centered" xs="1">
                    <img className="profile-image-sm" alt="user" src={this.props.image}></img>
            </Col>
            <Col className="comment-col" xs="11">
              <strong>{this.props.name}</strong>
              <p className="comment-text">{this.props.text}</p>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
export default Comment;
