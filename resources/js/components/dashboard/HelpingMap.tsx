import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { IJobDefinition, IHelpingMapProps } from "../../interfaces/dashboard.interfaces";



interface IHelpingMapState {
    latitude: number;
    longitude: number;
    radius: number;
}

class HelpingMap extends Component<IHelpingMapProps, IHelpingMapState> {

    state = {
        latitude: 52.2043,
        longitude: 0.1196,
        radius: 5.0,
    }

    private getJobs = () => {
        this.props.updateJobs(
            this.state.latitude,
            this.state.longitude,
            this.state.radius,
        );
    }

    componentDidUpdate(prevProps: IHelpingMapProps, prevState: IHelpingMapState): void {
        // if (prevProps !== this.props) {
        //     this.getJobs()
        // }
    }

    componentDidMount(): void {
        this.getJobs()
    }

    render() {
        const MAPBOX_KEY = process.env.MIX_MAPBOX_TOKEN;
        const jobMarkers = this.props.jobs.map((job) =>
            <Marker key={job.id} position={[job.lat, job.long]} icon={new L.Icon({ iconUrl: 'https://img.icons8.com/flat_round/344/hand.png', iconSize: new L.Point(60, 60), className: "grow"})}>
                <Popup>
                    {job.owner_name} is asking, "{job.summary}"
                </Popup>
            </Marker>
        );

        return (
            // attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            <MapContainer center={[this.state.latitude, this.state.longitude]} zoom={16} scrollWheelZoom={true} style={{ height: '100%' }}>
                <TileLayer
                    attribution=''
                    url={`https://api.mapbox.com/styles/v1/timlaz/ckk9wcq2k2qz217p1nfkcjcni/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_KEY}`}
                />
                {jobMarkers}
            </MapContainer>
        );
    }
}

export default HelpingMap;