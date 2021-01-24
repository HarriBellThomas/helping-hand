import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { Modal, DisplayText, FormLayout, TextField, Autocomplete, Icon, ChoiceList } from '@shopify/polaris'
import { SearchMinor } from "@shopify/polaris-icons";
import { IJobDefinition, IAddJobModalProps } from "../../interfaces/dashboard.interfaces";



interface IAddJobModalState {
    placeName: string
    searchSuggestions: any[]
    searchLoading: boolean
    currentLatitude: number
    currentLongitude: number
    description: string
    summary: string
    completion_target: string
    severity: string[]
}

class AddJobModal extends Component<IAddJobModalProps, IAddJobModalState> {

    state = {
        placeName : "",
        searchSuggestions: [],
        searchLoading: false,
        currentLatitude: 0,
        currentLongitude: 0,
        description: "",
        summary: "",
        completion_target: "",
        severity: [],
    }

    private findPlaces(placeName: string) {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${process.env.MIX_MAPBOX_TOKEN}&cachebuster=1611496965594&autocomplete=true&country=gb&types=postcode%2Caddress%2Cpoi`
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

    private createJob = () => {
        axios.post(`/api/create-job.json`, {
            latitude: this.state.currentLatitude,
            longitude: this.state.currentLongitude,
            summary: this.state.summary,
            description: this.state.description,
            completion_target_1: new Date(this.state.completion_target).getTime() / 1000,
            completion_target_2: new Date(this.state.completion_target).getTime() / 1000,
            severity: this.state.severity[0],
        }).then(res => {
            const status = res.status;
            if (status == 200) {
                const obj = res.data;
                if ("success" in obj && obj["success"]) {
                    console.log(obj["payload"]);
                    this.props.onClose();
                    return;
                }
                console.log("Damn...", obj);
                return;
            } else {
                console.log(res);
            }
        });
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
        this.setState({currentLatitude: option[0][0][1]});
        this.setState({currentLongitude: option[0][0][0]});
    }

    render() {

        const textField = <Autocomplete.TextField
                            onChange={(newText) => {this.handleTextChange(newText)}}
                            label="Location"
                            value={this.state.placeName}
                            prefix={<Icon source={SearchMinor} color="inkLighter" />}
                            placeholder="Search"
                            helpText="Search for the location of your job"
                        />;

        return (
            <Modal
                open={this.props.openModal}
                title="Add a job"
                onClose={() => {this.props.onClose()}}
                primaryAction={{
                    content: 'Submit',
                    onAction: () => {this.props.onClose(); this.createJob()},
                }}
            >
                <Modal.Section>

                        <FormLayout>
                        <TextField type="text" label="Summary" value={this.state.summary} onChange={(newText: string) => {this.setState({summary: newText})}} helpText="Give a brief summary of your task" />
                        <TextField type="text" label="Description" value={this.state.description} onChange={(newText: string) => {this.setState({description: newText})}} helpText="Give a detailed description of your task" />
                        <Autocomplete
                            options={this.state.searchSuggestions}
                            onSelect={(value) => {this.handleOptionSelection(value)}}
                            selected={this.state.searchSuggestions}
                            textField={textField}
                            loading={this.state.searchLoading}
                        />
                        <TextField type="date" label="Completion Date" value={this.state.completion_target} onChange={(newText: string) => {this.setState({completion_target: newText})}} helpText="Give the estimated date you want this completed by" />
                        <ChoiceList
                            title="Urgency"
                            choices={[
                                {label: 'Low', value: 'LOW'},
                                {label: 'Medium', value: 'MEDIUM'},
                                {label: 'Urgent', value: 'URGENT'},
                                {label: 'Emergency', value: 'EMERGENCY'},
                            ]}
                            selected={this.state.severity}
                            onChange={(value) => {this.setState({severity: value})}}
                        />
                        </FormLayout>
                </Modal.Section>
            </Modal>
        )
    }
}

export default AddJobModal;