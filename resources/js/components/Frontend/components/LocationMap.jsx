import React, { Component } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet';
import 'leaflet-draw/dist/leaflet.draw-src';

class LocationMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MapContainer
          center={this.props.center}
          zoom={this.props.zoom}
          style={{height:`${this.props.resourceExchangeProfile && '27em'}`, marginBottom: `${this.props.resourceExchangeProfile && '0'}`}}
        >
          <FeatureGroup>
            {this.props.listLangLat !== null && this.props.listLangLat.length > 0 && this.props.listLangLat?.map((item, index) => {
              return <Marker key={index} position={item}>
                <Popup>
                  Location details here.
                </Popup>
              </Marker>
            })}

          </FeatureGroup>
          <TileLayer
            //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    );
  }
}

export default LocationMap;
