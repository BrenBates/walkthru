import React from "react";
import {
  Row, Col, Card
} from 'reactstrap';
import './house.css'
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

export class SavedHouse extends React.Component {

render() {
    return (

        <div>

        <Card>
          <Row>
              <Col xs="5"><p>{this.props.street}</p></Col>
              <Col xs="5"><p>{this.props.city}</p></Col>       
              <Col xs="2"><button onClick={() => this.props.deleteSavedHouse(this.props.savedHouseID)}><FiDelete/></button></Col>
          </Row>
          <Row> 
              <Col xs="6"><p>{this.props.st}</p></Col>
              <Col xs="6"><p>{this.props.zip}</p></Col>   
          </Row>
          <Row>
              <Col xs="12"><img alt="house" src={this.props.houseImage}></img></Col>
          </Row>
          <Row>

              <Col xs="12">
                <button>
                    <Link to={"/api/houses/" +this.props.houseID}>Go to House</Link>
                </button>
              </Col>
              
          </Row>

        </Card>

        </div>
    )

}

}
  
  export default SavedHouse;

