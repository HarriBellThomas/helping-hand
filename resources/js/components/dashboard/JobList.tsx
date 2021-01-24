import React, { Component } from "react";
import { IJobDefinition, IJobListProps } from "../../interfaces/dashboard.interfaces";
import { ResourceItem, ResourceList, TextStyle } from "@shopify/polaris";


class JobList extends Component<IJobListProps, {}> {

    private severityToColour(severity: string) {
        switch (severity) {
            case "LOW": return "#34b100";
            case "MEDIUM": return "#34b100";
            case "URGENT": return "#34b100";
            case "EMERGENCY": return "#34b100";
            default: return "#34b100";
        }
    }

    private renderItem = (job: IJobDefinition, id: string, index: number) => {
        const colour = this.severityToColour(job.severity);
        return (
            <ResourceItem
              id={id}
              onClick={() => {}}
            >
                <span style={{ display: "inline-block" }}>
                    <div style={{ width: "1rem", height: "1rem", backgroundColor: colour, display: "inline-block", borderRadius: "1rem", marginRight: "1rem" }} />
                    <h3 style={{ lineHeight: "2.8rem", display: "inline-block" }}><TextStyle variation="strong">{job.summary}</TextStyle> ({job.severity})</h3>
                </span>
                
            </ResourceItem>
        );
    }

    render() {
        return (
            <ResourceList items={this.props.jobs} renderItem={this.renderItem} />
        );
    }
}

export default JobList;