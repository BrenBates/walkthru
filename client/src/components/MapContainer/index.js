import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '400px',
};

export class MapContainer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        stores: props.mapInfo
      }
    }
  
    displayMarkers = () => {
      return this.state.stores.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.lat,
         lng: store.long
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }
  
    render() {
      return (
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 40.759, lng: -111.876}}
          >
            {this.displayMarkers()}
          </Map>
      );
    }
  }
    
    export default GoogleApiWrapper({
        apiKey: 'AIzaSyAMNknoCxB5QgbbRHfRWwB05nWZgRkjwp4'
      })(MapContainer);

   