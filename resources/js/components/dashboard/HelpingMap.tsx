import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

class HelpingMap extends Component {
    render() {

        const MAPBOX_KEY = process.env.MIX_MAPBOX_TOKEN;
        
        return (
            // attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: '100%'}}>
            <TileLayer
                attribution=''
                url={`https://api.mapbox.com/styles/v1/timlaz/ckk9wcq2k2qz217p1nfkcjcni/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_KEY}`}
            />
            <Marker position={[51.505, -0.09]} icon={new L.Icon({iconUrl: 'https://img.icons8.com/flat_round/344/hand.png', iconSize: new L.Point(60, 60)})}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>    
        </MapContainer>
        );
    }
}

"https://img.icons8.com/flat_round/344/hand.png";

export default HelpingMap;