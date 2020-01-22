
import React, { Component } from "react";
import API from "../utils/API";
// const { setAuthTokens } = useAuth();

class House extends Component {
  state = {
    house: [],
    comments: "",
  };

  componentDidMount() {
    this.loadHouse();
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
        House page
      </div>
    );
  }
}


export default House;
