import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { IJobDefinition, IHelpingMapProps } from "../../interfaces/dashboard.interfaces";

interface IHelpingMapState {
    jobList: IJobDefinition[]
}

class HelpingMap extends Component<IHelpingMapProps, IHelpingMapState> {

    state = {
        jobList: [] as IJobDefinition[],
    }

    private getJobs = () => {
        axios.post(`/api/get-jobs.json`, {
          lat: this.props.latitude,
          long: this.props.longitude,
          radius: this.props.radius,
        }).then(res => {
          const status = res.status;
          if (status == 200) {
              const obj = res.data;
              if ("success" in obj && obj["success"]) {
                  const jobs: IJobDefinition[] = obj["payload"]["jobs"] as IJobDefinition[];
                  this.setState({jobList: jobs});
                  return;
              }
              console.log("Damn...");
              return;
          }else{
            console.log(res);
          }
        });
    }

    componentDidUpdate(prevProps: IHelpingMapProps, prevState: IHelpingMapState): void {
        if (prevProps !== this.props) {
            this.getJobs()
        }
    }

    componentDidMount(): void {
        this.getJobs()
    }

    render() {
        const MAPBOX_KEY = process.env.MIX_MAPBOX_TOKEN;
        const jobMarkers = this.state.jobList.map((job) =>
            <Marker key={job.id} position={[job.lat, job.long]} icon={new L.Icon({iconUrl: 'https://img.icons8.com/flat_round/344/hand.png', iconSize: new L.Point(60, 60)})}>
                <Popup>
                    {job.owner_name} is asking, "{job.summary}"
                </Popup>
            </Marker>
        );

        return (
            // attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
        <MapContainer center={[this.props.latitude, this.props.longitude]} zoom={16} scrollWheelZoom={true} style={{height: '100%'}}>
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