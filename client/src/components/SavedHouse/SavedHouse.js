import React from "react";
import {
  Card, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import './house.css'
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

export class SavedHouse extends React.Component {

  render() {
    return (

      <div>

        <Card className="savedHouseCard">
          <CardBody>
            <CardTitle>{`${this.props.street}`} <button className="savedHouseDeleteBtn" onClick={() => this.props.deleteSavedHouse(this.props.savedHouseID)}><FiDelete /></button></CardTitle>
            <CardSubtitle>{`${this.props.city} ${this.props.st}, ${this.props.zip}`}</CardSubtitle>
          </CardBody>
          <img className="savedHouseImg" src={this.props.houseImage} alt="House" />
          <CardBody>
            <button>
              <Link to={"/api/houses/" + this.props.houseID}>Go to House</Link>
            </button>
          </CardBody>
        </Card>

      </div>
    )

  }

}

export default SavedHouse;

