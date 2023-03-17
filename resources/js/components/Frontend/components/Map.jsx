import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import teslaData from "../../../../data/tesla-sites.json";

function Map() {
  const [organisationList, setOrganisationList] = useState([]);

  useEffect(() => {
    getOrganisationList();

  }, []);

  const getOrganisationList = () => {
		axios.get(`/api/organisation-map`).then(res => {
			if(res.data.status === 200) {
        //console.log(res.data.organization_map);
				setOrganisationList(res.data.organization_map);
			}
		});
	}

  //const filterOrganizations = teslaData.filter(tesla => tesla.address.country === "Italy")

  return (
    <MapContainer center={[7.873054, 80.771797]} zoom={8} scrollWheelZoom={true}>
      {/* Sri Lanka: [7.873054, 80.771797] */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {organisationList.map(tesla => (
        <>
          {tesla.locations !== '[]' && 
            <Marker 
            key = {tesla.org_name}
            position={[JSON.parse(tesla.locations)[0].lat, JSON.parse(tesla.locations)[0].lng]}>
              <Popup position={[JSON.parse(tesla.locations)[0].lat, JSON.parse(tesla.locations)[0].lng]}>
                <div>
                  <h2>{tesla.org_name}</h2>
                </div>
              </Popup>
            </Marker>
          }
        </>
      ))}


    </MapContainer>
  )
}

export default Map