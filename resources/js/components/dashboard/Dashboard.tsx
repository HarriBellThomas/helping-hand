import { AppProvider, Frame, Navigation, Modal, TopBar, TextContainer, FormLayout, TextField, ButtonGroup, Button, Sheet, Heading } from "@shopify/polaris";
import { ArrowLeftMinor, CirclePlusMajor, ConversationMinor, CustomersMajor, HomeMajor, MobileCancelMajor, OrdersMajor } from "@shopify/polaris-icons";
import React from "react";
import { Component, useState } from "react";
import { IDashboardProps } from "../../interfaces/dashboard.interfaces";
import HelpingMap from "./HelpingMap";


interface IDashboardState {
    showAccountDialog: boolean,
    sheetOpen: boolean,
}


class Dashboard extends Component<IDashboardProps, IDashboardState> {

    state = {
        showAccountDialog: false,
        sheetOpen: false,
    }

    private navigationMarkup = (

        <Navigation location="/">
            <Navigation.Section
                title="Helping Hand"
                items={[
                    {
                        label: 'Account',
                        icon: CustomersMajor,
                        onClick: () => { this.setState({ showAccountDialog: true }) },
                    },
                    {
                        label: 'Orders',
                        icon: OrdersMajor,
                        onClick: () => { },
                    },
                ]}
                action={{
                    icon: ConversationMinor,
                    accessibilityLabel: 'Contact support',
                    onClick: () => { },
                }}
            />
        </Navigation>
    );

    render() {
        const { showAccountDialog, sheetOpen } = this.state;
        const leftOffset = sheetOpen ? 39 : 1;
        return (
            <div style={{ height: '100%' }}>
                <AppProvider
                    theme={{
                        colors: {
                            primary: '#225062',
                        }
                    }}
                    i18n={{}}
                    features={{ newDesignLanguage: true }}
                >
                    <Frame
                        navigation={this.navigationMarkup}
                        showMobileNavigation={false}
                        onNavigationDismiss={() => { }}
                    >
                        <HelpingMap
                            latitude={52.2043}
                            longitude={0.1196}
                            radius={5}
                        />

                        <div className="multitool" style={{ right: `${leftOffset}rem` }}>
                            <ButtonGroup segmented>
                                <Button icon={HomeMajor} size="large" onClick={() => this.setState({ sheetOpen: !sheetOpen })}></Button>
                                <Button primary icon={CirclePlusMajor} size="large"></Button>
                            </ButtonGroup>
                        </div>
                    </Frame>

                    <Modal
                        open={showAccountDialog}
                        title="Account Details"
                        onClose={() => { this.setState({ showAccountDialog: false }) }}
                    >
                        <Modal.Section>
                            <TextContainer>
                                <p>
                                    Hello, [NAME GOES HERE]
                          </p>
                                <br></br>
                            </TextContainer>
                            <FormLayout>
                                <TextField type="email" label="Email" onChange={() => { }} />
                                <TextField type="password" label="Password" onChange={() => { }} />
                            </FormLayout>
                        </Modal.Section>
                    </Modal>


                    <Sheet open={sheetOpen} onClose={() => this.setState({ sheetOpen: false })}>
                        <div
                            style={{
                                alignItems: 'center',
                                borderBottom: '1px solid #DFE3E8',
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '1.6rem',
                                width: '100%',
                            }}
                        >
                            <Heading>Manage sales channels</Heading>
                            <Button
                                accessibilityLabel="Cancel"
                                icon={MobileCancelMajor}
                                onClick={() => this.setState({ sheetOpen: false })}
                                plain
                            />
                        </div>
                    </Sheet>



                </AppProvider>
            </div>
        );
    }
}

export default Dashboard;