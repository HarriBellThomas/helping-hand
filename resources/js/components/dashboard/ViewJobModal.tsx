import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { Modal, DisplayText, FormLayout, TextField, Autocomplete, Icon, ChoiceList, TextContainer, Heading } from '@shopify/polaris'
import { SearchMinor } from "@shopify/polaris-icons";
import { IJobDefinition, IViewJobModalProps } from "../../interfaces/dashboard.interfaces";



interface IViewJobModalState {
}

class ViewJobModal extends Component<IViewJobModalProps, IViewJobModalState> {
    render() {

        if (this.props.job) {
        return (
            <Modal
                open={this.props.openModal}
                title={this.props.job.summary}
                onClose={() => {this.props.onClose()}}
                primaryAction={{
                    content: 'Volunteer',
                    onAction: () => {this.props.onClose()},
                }}
            >
                <Modal.Section>
                    <TextContainer>
                        <Heading>has a job for you!</Heading>
                        <p>
                            {this.props.job.description}
                        </p>
                        <p>
                            This is classified as {this.props.job.severity} and needs to be completed by {new Date(this.props.job.completion_target_1 * 1000).toLocaleDateString()}
                        </p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        )
    }
    else return <div></div>
    }
}

export default ViewJobModal;