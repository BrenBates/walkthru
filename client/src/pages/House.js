
import React, { Component } from "react";
import API from "../utils/API";
// const { setAuthTokens } = useAuth();

class House extends Component {
  state = {
    houseID: 0,
    comments: "",
  };

  componentDidMount() {
 
    this.setState({houseID: this.props.match.params.id})
    // this.loadHouse();

  }

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

  render() {
    return (
      <div>
        <p>House page</p>
        <p>{this.state.houseID}</p>
      </div>
    );
  }
}


export default House;
