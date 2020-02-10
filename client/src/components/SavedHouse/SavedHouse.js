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

        <Card className="saved-house-card">
          <CardTitle className="saved-house-card-title">{`${this.props.headline}`}</CardTitle>
          <img className="saved-house-image" src={this.props.houseImage} alt="House" />
          <CardBody className="saved-house-card-body">
            <CardSubtitle className="saved-house-card-subtitle">{`${this.props.street}`} {`${this.props.city}`} {`${this.props.st}, ${this.props.zip}`}</CardSubtitle>
            <button>
              <Link to={"/api/houses/" + this.props.houseID}>Go to House</Link>
            </button>
            <button className="saved-house-delete-button" onClick={() => this.props.deleteSavedHouse(this.props.savedHouseID)}>X
            </button>
          </CardBody>
        </Card>

      </div>
    )

  }

}

export default SavedHouse;

