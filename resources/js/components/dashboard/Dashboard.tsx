import { AppProvider, Frame, Navigation, Modal, TopBar, TextContainer, FormLayout, TextField, ButtonGroup, Button, Sheet, Heading, RangeSlider } from "@shopify/polaris";
import { ArrowLeftMinor, CirclePlusMajor, ConversationMinor, CustomersMajor, FlagMajor, HomeMajor, LocationMajor, MobileBackArrowMajor, MobileCancelMajor, OrdersMajor, SmileyJoyMajor, TextAlignmentLeftMajor } from "@shopify/polaris-icons";
import React from "react";
import { Component, useState } from "react";
import { IDashboardProps, IJobDefinition } from "../../interfaces/dashboard.interfaces";
import HelpingMap from "./HelpingMap";
import JobList from "./JobList";
import axios from 'axios';
import { motion } from 'framer-motion'
import AddJobModal from "./AddJobModal";
import ViewJobModal from "./ViewJobModal";

interface IDashboardState {
    showAccountDialog: boolean,
    sheetOpen: boolean,
    jobs: IJobDefinition[],
    jobRadius: number,
    centerLatitude: number,
    centerLongitude: number,
    panIncrement: number,
    panToLatitude: number,
    panToLongitude: number,
    showAddJobModal: boolean,
    showJobDetails: boolean,
    jobForDetails: IJobDefinition | null
    jobType: number,
}


class Dashboard extends Component<IDashboardProps, IDashboardState> {

    state = {
        showAccountDialog: false,
        sheetOpen: false,
        jobs: [] as IJobDefinition[],
        jobRadius: 3,
        centerLatitude: 52.2053,
        centerLongitude: 0.1218,
        panIncrement: 0,
        panToLatitude: 0,
        panToLongitude: 0,
        showAddJobModal: false,
        showJobDetails: false,
        jobForDetails: null,
        jobType: 0,
    }

    private jobTitleForType(): string {
        switch (this.state.jobType) {
            case 1: return "Owned Job";
            case 2: return "Volunteered Job";
            default: return "Local Job";
        }
    }

    private updateSearchRadius(newValue: number): void {
        this.setState({jobRadius: newValue});
        this.updateJobs(this.state.centerLatitude, this.state.centerLongitude, this.state.jobRadius);
    }

    private updateJobs = (lat: number, long: number, radius: number) => {
        console.log(1);
        switch (this.state.jobType) {
            case 1: return this.getMyJobs(lat, long, radius);
            case 2: return this.getAssignedJobs(lat, long, radius);
            default: return this.getLocalJobs(lat, long, radius);
        }
    }

    private getLocalJobs = (lat: number, long: number, radius: number) => {
        console.log(2);
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
                    const jobs: IJobDefinition[] = obj["payload"]["jobs"] as IJobDefinition[];
                    this.setState({ jobs: jobs });
                    return;
                }
                console.log("Damn...");
                return;
            } else {
                console.log(res);
            }
        });
    }

    private getMyJobs = (lat: number, long: number, radius: number) => {
        console.log(3);
        axios.post(`/api/get-jobs-owned-by-user.json`, {
            lat: lat,
            long: long,
            radius: radius,
        }).then(res => {
            const status = res.status;
            if (status == 200) {
                const obj = res.data;
                console.log(obj);
                if ("success" in obj && obj["success"]) {
                    const jobs: IJobDefinition[] = obj["payload"]["jobs"] as IJobDefinition[];
                    this.setState({ jobs: jobs });
                    return;
                }
                console.log("Damn...");
                return;
            } else {
                console.log(res);
            }
        });
    }

    private getAssignedJobs = (lat: number, long: number, radius: number) => {
        console.log(4);
        axios.post(`/api/get-jobs-assigned-to-user.json`, {
            lat: lat,
            long: long,
            radius: radius,
        }).then(res => {
            const status = res.status;
            if (status == 200) {
                const obj = res.data;
                console.log(obj);
                if ("success" in obj && obj["success"]) {
                    const jobs: IJobDefinition[] = obj["payload"]["jobs"] as IJobDefinition[];
                    this.setState({ jobs: jobs });
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
                    // console.log(obj["payload"]);
                    // const oldJobs = this.state.jobs;
                    // oldJobs.push(obj["payload"]["job"] as IJobDefinition);
                    // this.setState({ jobs: oldJobs });
                    return;
                }
                console.log("Damn...", obj);
                return;
            } else {
                console.log(res);
            }
        });
    }

    private panToCoordinates(lat: number, lon: number) {
        this.setState({
            panToLatitude: lat,
            panToLongitude: lon,
            panIncrement: this.state.panIncrement + 1,
        });
    }

    private navigationMarkup = (

        <Navigation location="/">
            <img className="culdesac-logo" src={"/images/culdesac.png"} style={{ margin: "1rem 3rem 1rem 1rem" }} />
            <Navigation.Section
                items={[
                    {
                        label: 'Account',
                        icon: CustomersMajor,
                        onClick: () => { this.setState({ showAccountDialog: true }) },
                    },
                    {
                        label: 'Logout',
                        icon: MobileBackArrowMajor,
                        onClick: () => window.location.href = "/logout",
                    },
                ]}
                action={{
                    icon: ConversationMinor,
                    accessibilityLabel: 'Contact support',
                    onClick: () => this.createJob()
                }}
            />
            <Navigation.Section
                title="Jobs"
                items={[
                    {
                        label: 'Local Jobs',
                        icon: LocationMajor,
                        onClick: () => {
                            this.setState({ jobType: 0 }, () => {
                                this.updateJobs(this.state.centerLatitude, this.state.centerLongitude, this.state.jobRadius);
                            });
                        },
                    },
                    {
                        label: 'My Jobs',
                        icon: SmileyJoyMajor,
                        onClick: () => {
                            this.setState({ jobType: 1 }, () => {
                                this.updateJobs(this.state.centerLatitude, this.state.centerLongitude, this.state.jobRadius);
                            });
                        },
                    },
                    {
                        label: 'Volunteered For',
                        icon: FlagMajor,
                        onClick: () => {
                            this.setState({ jobType: 2 }, () => {
                                this.updateJobs(this.state.centerLatitude, this.state.centerLongitude, this.state.jobRadius);
                            });
                        },
                    },
                ]}
                separator
            />
        </Navigation>
    );

    render() {
        const { showAccountDialog, sheetOpen, jobs, panIncrement, panToLatitude, panToLongitude } = this.state;
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
                    features={{ newDesignLanguage: false }}
                >
                    <Frame
                        navigation={this.navigationMarkup}
                        showMobileNavigation={false}
                        onNavigationDismiss={() => { }}
                    >
                        <HelpingMap
                            updateJobs={this.updateJobs}
                            jobs={jobs}
                            radius={this.state.jobRadius}
                            latitude={this.state.centerLatitude}
                            longitude={this.state.centerLongitude}
                            panIncrement={panIncrement}
                            panToLatitude={panToLatitude}
                            panToLongitude={panToLongitude}
                            showCircle={this.state.jobType == 0}
                        />

                        <motion.div animate = {{right: `${leftOffset}rem`}} className="multitool" transition={{type: "tween", ease:[0.25, 0.1, 0.25, 1.0], duration: 0.3, delay: 0.04}}>
                            <ButtonGroup segmented>
                                <Button primary icon={CirclePlusMajor} size="large" onClick={() => this.setState({ showAddJobModal: !this.state.showAddJobModal })}></Button>
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
                                    Hello, {this.props.user.name}
                          </p>
                                <br></br>
                            </TextContainer>
                            <FormLayout>
                                <TextField type="email" label="Email" value={this.props.user.email} disabled={true} onChange={() => { }} />
                                <TextField type="text" label="Postcode" value={"CB2 1TP"} onChange={() => { }} />
                                <RangeSlider
                                    label="Search Radius (Km)"
                                    value={this.state.jobRadius}
                                    min={0.1}
                                    max={5}
                                    onChange={(newVal: number) => {this.updateSearchRadius(newVal)}}
                                    step={0.1}
                                    output
                                />
                            </FormLayout>
                        </Modal.Section>
                    </Modal>

                    <AddJobModal openModal={this.state.showAddJobModal} onClose={() => {
                        this.setState({ showAddJobModal: false });
                        this.updateJobs(this.state.centerLatitude, this.state.centerLongitude, this.state.jobRadius);
                    }}/>

                    <ViewJobModal openModal={this.state.showJobDetails} job={this.state.jobForDetails!} onClose={() => {
                        this.setState({ showJobDetails: false });
                    }}/>

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
                            <Heading>{jobs.length} {this.jobTitleForType()}{jobs.length != 1 ? "s" : ""}</Heading>
                            <Button
                                accessibilityLabel="Cancel"
                                icon={MobileCancelMajor}
                                onClick={() => this.setState({ sheetOpen: false })}
                                plain
                            />
                        </div>
                        <JobList 
                            jobs={jobs}
                            showJob={(job) => this.panToCoordinates(job.latitude, job.longitude)}
                            jobDetails={(job) => {
                                this.setState({ jobForDetails: job, showJobDetails: true });
                            }}
                        />
                    </Sheet>



                </AppProvider>
            </div>
        );
    }
}

export default Dashboard;