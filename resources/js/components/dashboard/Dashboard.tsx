import { AppProvider, Frame, Navigation, Modal, TopBar, TextContainer, FormLayout, TextField } from "@shopify/polaris";
import { ArrowLeftMinor, ConversationMinor, CustomersMajor, HomeMajor, OrdersMajor } from "@shopify/polaris-icons";
import React from "react";
import { Component, useState} from "react";
import { IDashboardProps, IJobDefinition } from "../../interfaces/dashboard.interfaces";
import HelpingMap from "./HelpingMap";
import axios from 'axios';

class IDashboardState {

}


class Dashboard extends Component<IDashboardProps, IDashboardState> {


    private getJobs = () => {
      axios.post(`/api/get-jobs.json`, {
        lat: 0.0,
        long: 0.0,
        radius: 5,
      }).then(res => {
        const status = res.status;
        if (status == 200) {
            const obj = res.data;
            if ("success" in obj && obj["success"]) {
                const jobs: IJobDefinition[] = obj["payload"]["jobs"] as IJobDefinition[];
                if (jobs) {
                    console.log(jobs);
                } else {
                    console.log("Damn...");
                }
                return;
            }
            console.log("Damn...");
            return;
        }
      });
    }

    state = {
      showAccountDialog: false,
    }

    private userMenuMarkup = (
        <TopBar.UserMenu
          actions={[]}
          name="Harri"
          detail={"testing"}
          initials="H"
          open={false}
          onToggle={() => {}}
        />
      );

    private topBarMarkup = (
        <TopBar
          showNavigationToggle
          userMenu={this.userMenuMarkup}
          onNavigationToggle={() => {}}
        />
      );

    private navigationMarkup = (
      
        <Navigation location="/">
          <Navigation.Section
            title="Helping Hand"
            items={[
              {
                label: 'Account',
                icon: CustomersMajor,
                onClick: () => {this.setState({showAccountDialog: true})},
              },
              {
                label: 'Orders',
                icon: OrdersMajor,
                onClick: () => {},
              },
            ]}
            action={{
              icon: ConversationMinor,
              accessibilityLabel: 'Contact support',
              onClick: () => {},
            }}
          />
        </Navigation>
      );
      
    render() {
        this.getJobs();
        return (
            <div style={{height: '100%'}}>
                <AppProvider
                    theme={{
                        colors: {
                            primary: '#225062',
                        }
                    }}
                    i18n={{}}
                    features={{newDesignLanguage: true}}
                >
                    <Frame
                        // topBar={this.topBarMarkup}
                        navigation={this.navigationMarkup}
                        showMobileNavigation={false}
                        onNavigationDismiss={() => {}}
                    >
                        <HelpingMap/>
                    </Frame>

                    <Modal
                      open={this.state.showAccountDialog}
                      title="Account Details"
                      onClose={() => {this.setState({showAccountDialog: false})}}
                    >
                      <Modal.Section>
                        <TextContainer>
                          <p>
                            Hello, [NAME GOES HERE]
                          </p>
                          <br></br>
                        </TextContainer>
                      <FormLayout>
                          <TextField type="email" label="Email" onChange={() => {}} />
                          <TextField type="password" label="Password" onChange={() => {}} />
                        </FormLayout>
                      </Modal.Section>
                  </Modal>

                </AppProvider>
            </div>
        );
    }
}

export default Dashboard;