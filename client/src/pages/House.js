
import React, { Component } from "react";
import API from "../utils/API";
// const { setAuthTokens } = useAuth();

class House extends Component {
  state = {
    houseID: 0,
    comments: "",
    userName: ""
  };

  componentDidMount() {
    const params = this.props.match.params;

    this.setState({ houseID: params.id })
    // this.loadHouse();

  }

  // return (
  //   <div>
  //     <div>House Page</div>
  //     <div>{props.}</div>
  //     <Button onClick={logOut}>Log out</Button>
  //   </div>
  // );

  loadHouse = id => {
    API.getHouse()
      .then(res =>
        this.setState({ house: res.data })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // {
  //   headline: { type: String },
  //   houseImageURL: { type: String },
  //   street: { type: String, required: true },
  //   city: { type: String, required: true },
  //   state: { type: String, required: true },
  //   zip: { type: Number, required: true },
  //   lat: { type: Number },
  //   long: { type: Number },
  //   forRent: { type: Boolean },
  //   forSale: { type: Boolean }
  // },

  render() {
    return (
      <div>
        <p>House page</p>
        <p>{this.state.houseID}</p>
        <p>{this.state.comments}</p>
        <p>{this.state.userName}</p>
      </div>
    );
  }
}


export default House;
