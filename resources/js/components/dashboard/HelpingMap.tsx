import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { IJobDefinition, IHelpingMapProps } from "../../interfaces/dashboard.interfaces";



interface IHelpingMapState {
    latitude: number;
    longitude: number;
    radius: number;
    viewLatitude: number,
    viewLongitude: number,
    lockAnimation: boolean,
}

class HelpingMap extends Component<IHelpingMapProps, IHelpingMapState> {

    state = {
        latitude: 52.2043,
        longitude: 0.1196,
        radius: 5.0,
        panIncrement: 0,
        viewLatitude: 52.2043,
        viewLongitude: 0.1196,
        lockAnimation: false,
    }

    private map : L.Map | null = null; 

    private getJobs = () => {
        this.props.updateJobs(
            this.props.latitude,
            this.props.longitude,
            this.props.radius,
        );
    }

    componentDidUpdate(prevProps: IHelpingMapProps, prevState: IHelpingMapState): void {
        console.log("a", this.props);
        if (this.props.panIncrement !== prevProps.panIncrement && this.props.panIncrement > 0) {
            const { panToLatitude, panToLongitude } = this.props;
            console.log("new coords", panToLatitude, panToLongitude);
            this.setState({ viewLatitude: panToLatitude, viewLongitude: panToLongitude, lockAnimation: true });
            if (this.map) {
                this.setState({ lockAnimation: true });
                this.map.flyTo(new L.LatLng(panToLatitude, panToLongitude), 16, { duration: 1 });
                setTimeout(
                    () => this.setState({ lockAnimation: false }), 
                    1000
                );
            }
        }
    }

    componentDidMount(): void {
        this.getJobs()
    }

    private severityToMarker(severity: string) {
        switch (severity) {
            case "LOW": return "/images/green-marker.png";
            case "MEDIUM": return "/images/orange-marker.png";
            case "URGENT": return "/images/red-marker.png";
            case "EMERGENCY": return "/images/purple-marker.png";
            default: return "/images/green-marker.png";
        }
    }

    render() {

        const { viewLatitude, viewLongitude, lockAnimation } = this.state;
        const MAPBOX_KEY = process.env.MIX_MAPBOX_TOKEN;
        const className = lockAnimation ? "" : "grow";
        const jobMarkers = this.props.jobs.map((job) =>
            <Marker key={job.id} position={[job.latitude, job.longitude]} icon={new L.Icon({ iconUrl: this.severityToMarker(job.severity), iconSize: new L.Point(60, 60), className: className })}>
                <Popup>
                    {job.owner_name} is asking, "{job.summary}"
                </Popup>
            </Marker>
        );

        return (
            // attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            <MapContainer center={[viewLatitude, viewLongitude]} zoom={13} scrollWheelZoom={true} style={{ height: '100%' }} whenCreated={(m) => this.map = m}>
                <TileLayer
                    attribution=''
                    url={`https://api.mapbox.com/styles/v1/timlaz/ckk9wcq2k2qz217p1nfkcjcni/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_KEY}`}
                />
                {jobMarkers}
                <Circle center={[this.props.latitude, this.props.longitude]} radius={this.props.radius * 1000} color='#b296e1' interactive={false}/>
            </MapContainer>
        );
    }
}

export default HelpingMap;