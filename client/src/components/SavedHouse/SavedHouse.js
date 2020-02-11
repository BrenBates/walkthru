import React from "react";
import {
  Card, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import './savedhouse.css'
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

export class SavedHouse extends React.Component {

  render() {
    return (

      <div>

        <Link to={"/api/houses/" + this.props.houseID}>
          <Card className="saved-house-card">
            <CardTitle className="saved-house-card-title">{`${this.props.headline}`}
              <button className="saved-house-delete-button" onClick={() => this.props.deleteSavedHouse(this.props.savedHouseID)}>X
            </button></CardTitle>
            <img className="saved-house-image" src={this.props.houseImage} alt="House" />
            <CardBody className="saved-house-card-body">
              <CardSubtitle className="saved-house-card-subtitle">{`${this.props.street}`} {`${this.props.city}`} {`${this.props.st}, ${this.props.zip}`}</CardSubtitle>
            </CardBody>
          </Card>
        </Link>

      </div>
    )

  }

}

export default SavedHouse;

