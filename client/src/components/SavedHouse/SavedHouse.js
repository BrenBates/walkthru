import React from "react";
import {
  Card, CardBody, CardTitle, CardSubtitle, Row
} from 'reactstrap';
import './savedhouse.css'
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

export class SavedHouse extends React.Component {

  render() {
    return (

      <div>

        <Card className="saved-house-card">
          <Link to={"/api/houses/" + this.props.houseID}>
            <CardTitle className="saved-house-card-title">{`${this.props.headline}`}</CardTitle>
          </Link>
          <Link to={"/api/houses/" + this.props.houseID}>
            <img className="saved-house-image" src={this.props.houseImage} alt="House" />
          </Link>
          <CardBody className="saved-house-card-body">
            <Link to={"/api/houses/" + this.props.houseID}>
              <CardSubtitle className="saved-house-card-subtitle">{`${this.props.street}`} {`${this.props.city}`} {`${this.props.st}, ${this.props.zip}`}</CardSubtitle>
            </Link>
            <Row>
              <button className="saved-house-delete-button" onClick={() => this.props.deleteSavedHouse(this.props.savedHouseID)}>X</button>
            </Row>
          </CardBody>
        </Card>

      </div>
    )

  }

}

export default SavedHouse;

