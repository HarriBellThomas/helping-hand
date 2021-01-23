import React, { Component } from "react";
import { AppProvider, Page, Card } from "@shopify/polaris";
import HelpingMap from "../HelpingMap";
import ContainerDimensions from "react-container-dimensions";

class NewDashboard extends Component {
    render() {
        return (
            <AppProvider i18n={{}}>
                <Page title="Example app">
                    <Card sectioned>
                        <HelpingMap/>
                    </Card>
                </Page>
            </AppProvider>
        );
    }
}

export default NewDashboard;