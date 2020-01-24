import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '90%',
  height: '400px',
};

export class MapContainer extends React.Component {
    constructor(props) {
      super(props);
    }

    displayMarkers = () => {
      return this.props.mapInfo.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.lat,
         lng: store.long
       }}
       onClick={() => {
        //Run the click function back on the landing page to load the clicked house information
        this.props.clickHouse(store._id)
      }
      
      } />

      

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

   