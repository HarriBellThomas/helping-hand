import { AppProvider, Frame, Navigation, Modal, TopBar, TextContainer, FormLayout, TextField } from "@shopify/polaris";
import { ArrowLeftMinor, ConversationMinor, CustomersMajor, HomeMajor, OrdersMajor } from "@shopify/polaris-icons";
import React from "react";
import { Component, useState} from "react";
import { IDashboardProps } from "../../interfaces/dashboard.interfaces";
import HelpingMap from "./HelpingMap";

class IDashboardState {

}


class Dashboard extends Component<IDashboardProps, IDashboardState> {

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