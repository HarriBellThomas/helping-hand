import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { Modal, TextContainer, FormLayout, TextField, Autocomplete, Icon } from '@shopify/polaris'
import { SearchMinor } from "@shopify/polaris-icons";
import { IJobDefinition, IAddJobModalProps } from "../../interfaces/dashboard.interfaces";



interface IAddJobModalState {
    placeName: string
    searchSuggestions: any[]
    searchLoading: boolean
    currentLatitude: boolean
    currentLongitude: boolean
}

class AddJobModal extends Component<IAddJobModalProps, IAddJobModalState> {

    state = {
        placeName : "",
        searchSuggestions: [],
        searchLoading: false,
        currentLatitude: 0,
        currentLongitude: 0,
    }

    private findPlaces(placeName: string) {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${process.env.MIX_MAPBOX_TOKEN}&cachebuster=1611496965594&autocomplete=true&country=gb`
        ).then(
            res => {
                const status = res.status;
                if (status == 200) {
                    const obj = res.data;
                    const places = obj['features'];
                    console.log(places)
                    const mappedPlaces = places.map((p) => ({'value': [p['center'], p['place_name']], 'label': p['place_name']}));
                    this.setState({searchLoading: false});   
                    this.setState({searchSuggestions: mappedPlaces});
                    return;
                } else {
                    console.log(res);
                }
            }
            
        );
    }

    private handleTextChange(newValue: string) {
        this.setState({searchLoading: true});
        this.setState({placeName: newValue});{}
        if (this.state.placeName === ''){
            this.setState({searchSuggestions: []})
            this.setState({searchLoading: false});
        } else {
            this.findPlaces(this.state.placeName);
        }
    }

    private handleOptionSelection(option) {
        console.log(option)
        this.setState({placeName: option[0][1]});
        this.setState({currentLatitude: option[0][0][0]});
        this.setState({currentLongitude: option[0][0][1]});
    }

    render() {

        const textField = <Autocomplete.TextField
                            onChange={(newText) => {this.handleTextChange(newText)}}
                            label="Location"
                            value={this.state.placeName}
                            prefix={<Icon source={SearchMinor} color="inkLighter" />}
                            placeholder="Search"
                        />;

        return (
            <Modal
                open={this.props.openModal}
                title="Add a job"
                onClose={() => {this.props.onClose()}}
            >
                <Modal.Section>
                    <FormLayout>
                    <Autocomplete
                        options={this.state.searchSuggestions}
                        onSelect={(value) => {this.handleOptionSelection(value)}}
                        selected={this.state.searchSuggestions}
                        textField={textField}
                        loading={this.state.searchLoading}
                    />
                    </FormLayout>
                </Modal.Section>
            </Modal>
        )
    }
}

export default AddJobModal;