import React from "react";
<<<<<<< HEAD
import { Row, Col, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
=======
import { Row, Col, Button } from "reactstrap";
>>>>>>> origin/dev
import { Link } from "react-router-dom";


export class HouseListContainer extends React.Component {


<<<<<<< HEAD
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
=======
    render() {
        return (
            <div>
                <Row>
                    <Col xs="10">
                        {this.props.headline}
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">
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
                    <Col xs="2">
                        <Button color="dark" className="float-right">
                            <Link to={"/api/houses/" + this.props.houseID}>Details</Link>
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
>>>>>>> origin/dev
}

export default HouseListContainer;