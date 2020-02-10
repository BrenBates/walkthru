import React from "react";
import { CardImg, CardGroup, Card } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles.css";
import "../HouseListContainer/houselistcontainer.css";


export class HouseListContainer extends React.Component {


    render() {
        return (
            // <div>
            //     <Row className="house-list-row">
            //       <Col className="col-centered" md="2">
            //         <Button color="dark" className="float-right">
            //             <Link to={"/api/houses/" + this.props.houseID}>Details</Link>
            //         </Button>
            //       </Col>
            //       <Col className="house-list-col" md="4">
            //         <strong>{this.props.headline}</strong>
            //         </Col>
            //       <Col className="house-list-col" md="6">
            //         <p className="house-list-text">{this.props.street} {this.props.city}, {this.props.st} {this.props.zip}</p>
            //       </Col>
            //     </Row>
            // </div>

            <div>
                <CardGroup>
                    <Link to={"/api/houses/" + this.props.houseID}>
                        <Card className="house-list-card">
                            <CardImg top width="100%" src={this.props.houseImageURL} />
                        {this.props.headline} {this.props.street} {this.props.city} {this.props.st}, {this.props.zip}</Card>
                    </Link>
                </CardGroup>
            </div>
        )
    }
}

export default HouseListContainer;