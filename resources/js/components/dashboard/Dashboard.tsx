import { AppProvider, Frame, Navigation, TopBar } from "@shopify/polaris";
import { ArrowLeftMinor, ConversationMinor, HomeMajor, OrdersMajor } from "@shopify/polaris-icons";
import React from "react";
import { Component } from "react";
import { IDashboardProps } from "../../interfaces/dashboard.interfaces";
import HelpingMap from "./HelpingMap";

class IDashboardState {

}


class Dashboard extends Component<IDashboardProps, IDashboardState> {

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
                label: 'Dashboard',
                icon: HomeMajor,
                onClick: () => {},
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
                </AppProvider>
            </div>
        );
    }
}

export default Dashboard;