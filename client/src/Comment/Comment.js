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
            <Col className="col-centered" xs={3} md={2} lg={1} xl={1} >
                    <img className="profile-image-sm" alt="user" src={this.props.image}></img>
            </Col>
            <Col className="comment-col" xs={9} md={10} lg={11} xl={11} >
              <strong className="user-text">{this.props.name}</strong>
              <p className="comment-text">{this.props.text}</p>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
export default Comment;
