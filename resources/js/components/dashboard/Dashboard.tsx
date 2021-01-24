import { AppProvider, Frame, Navigation, Modal, TopBar, TextContainer, FormLayout, TextField, ButtonGroup, Button, Sheet, Heading } from "@shopify/polaris";
import { ArrowLeftMinor, CirclePlusMajor, ConversationMinor, CustomersMajor, HomeMajor, MobileCancelMajor, OrdersMajor, TextAlignmentLeftMajor } from "@shopify/polaris-icons";
import React from "react";
import { Component, useState } from "react";
import { IDashboardProps, IJobDefinition } from "../../interfaces/dashboard.interfaces";
import HelpingMap from "./HelpingMap";
import JobList from "./JobList";
import axios from 'axios';
import { motion } from 'framer-motion'

interface IDashboardState {
    showAccountDialog: boolean,
    sheetOpen: boolean,
    jobs: IJobDefinition[],
}


class Dashboard extends Component<IDashboardProps, IDashboardState> {

    state = {
        showAccountDialog: false,
        sheetOpen: false,
        jobs: [] as IJobDefinition[],
    }

    private updateJobs = (lat: number, long: number, radius: number) => {
        axios.post(`/api/get-jobs.json`, {
            lat: lat,
            long: long,
            radius: radius,
        }).then(res => {
            const status = res.status;
            if (status == 200) {
                const obj = res.data;
                console.log(obj);
                if ("success" in obj && obj["success"]) {
                    console.log(obj["payload"]["jobs"]);
                    const jobs: IJobDefinition[] = obj["payload"]["jobs"] as IJobDefinition[];
                    this.setState({ jobs: jobs });
                    console.log(jobs);
                    return;
                }
                console.log("Damn...");
                return;
            } else {
                console.log(res);
            }
        });
    }


    private createJob = () => {
        axios.post(`/api/create-job.json`, {
            latitude: 52.2043,
            longitude: 0.1196,
            summary: "test",
            description: "test",
            completion_target_1: 0,
            completion_target_2: 0,
            severity: "URGENT",
        }).then(res => {
            const status = res.status;
            if (status == 200) {
                const obj = res.data;
                if ("success" in obj && obj["success"]) {
                    console.log(obj["payload"]);
                    return;
                }
                console.log("Damn...", obj);
                return;
            } else {
                console.log(res);
            }
        });
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
                    onClick: () => this.createJob(),
                }}
            />
        </Navigation>
    );

    render() {
        const { showAccountDialog, sheetOpen, jobs } = this.state;
        const leftOffset = sheetOpen ? 46 : 1;
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
                            updateJobs={this.updateJobs}
                            jobs={jobs}
                        />

                        <motion.div animate = {{right: `${leftOffset}rem`}} className="multitool" transition={{type: "tween", ease:[0.25, 0.1, 0.25, 1.0], duration: 0.3, delay: 0.04}}>
                            <ButtonGroup segmented>
                                <Button primary icon={CirclePlusMajor} size="large"></Button>
                                <Button icon={TextAlignmentLeftMajor} size="large" onClick={() => this.setState({ sheetOpen: !sheetOpen })}></Button>
                            </ButtonGroup>
                        </motion.div>
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
                            <Heading>{jobs.length} Local Job{jobs.length != 1 ? "s" : ""}</Heading>
                            <Button
                                accessibilityLabel="Cancel"
                                icon={MobileCancelMajor}
                                onClick={() => this.setState({ sheetOpen: false })}
                                plain
                            />
                        </div>
                        <JobList jobs={jobs}/>
                    </Sheet>



                </AppProvider>
            </div>
        );
    }
}

export default Dashboard;