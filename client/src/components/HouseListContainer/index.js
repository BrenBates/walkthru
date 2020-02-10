import React from "react";
import { Row, Col, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { Link } from "react-router-dom";


export class HouseListContainer extends React.Component {


render () {
    return (
        <div>
            <ListGroupItem className="list-item">
                <ListGroupItemHeading className="list-item-heading">
                    <Row>
                        <Col xs="8">
                            {this.props.headline}
                        </Col>
                    </Row>
                </ListGroupItemHeading>
                <ListGroupItemText className="list-item-text">
                    <Row text="center">
                        <Col xs="3">
                            {this.props.street}
                        </Col>
                        <Col xs="3">
                            {this.props.city}
                        </Col>
                        <Col xs="1">
                            {this.props.st}
                        </Col>
                        <Col xs="2">
                            {this.props.zip}
                        </Col>
                        <Col xs="3">
                            <button className="button-house-detail">
                                <Link to={"/api/houses/" + this.props.houseID}>Details</Link>
                            </button>
                        </Col>
                    </Row>
                </ListGroupItemText>
            </ListGroupItem>
        </div>
    )
} 
}

export default HouseListContainer;