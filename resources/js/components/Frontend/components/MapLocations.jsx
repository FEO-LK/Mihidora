import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const MapLocations = (props) => {
    return (
        <MapContainer center={[7.873054, 80.771797]} zoom={8} scrollWheelZoom={true}>
            {/* Sri Lanka: [7.873054, 80.771797] */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {props.locationList?.map(tesla => (
                <>
                    {tesla.locations !== '[]' &&
                    <Marker
                        key = {tesla.project_title}
                        position={[JSON.parse(tesla.locations)[0].lat, JSON.parse(tesla.locations)[0].lng]}>
                        <Popup position={[JSON.parse(tesla.locations)[0].lat, JSON.parse(tesla.locations)[0].lng]}>
                            <div>
                                <h2>{tesla.project_title ? tesla.project_title : tesla.org_name ? tesla.org_name : tesla.title}</h2>
                            </div>
                        </Popup>
                    </Marker>
                    }
                </>
            ))}


        </MapContainer>
    )
}

export default MapLocations;

