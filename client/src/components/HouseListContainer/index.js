import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";


export class HouseListContainer extends React.Component {


render () {
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
                    <button>
                        <Link to={"/api/houses/" + this.props.houseID}>Details</Link>
                    </button>
                </Col>
            </Row>
        </div>
    )
} 
}

export default HouseListContainer;