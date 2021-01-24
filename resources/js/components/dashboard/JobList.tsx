import React, { Component } from "react";
import { IJobDefinition, IJobListProps } from "../../interfaces/dashboard.interfaces";
import { ResourceItem, ResourceList, TextStyle } from "@shopify/polaris";

interface IJobMetadata {
    colour: string,
    index: number,
}

interface IJobBundle {
    job: IJobDefinition,
    metadata: IJobMetadata,
}

class JobList extends Component<IJobListProps, {}> {

    private severityToMetadata(job: IJobDefinition): IJobMetadata {
        console.log(job);
        switch (job.severity) {
            case "LOW": return { colour: "rgb(52, 177, 0)", index: 1 } as IJobMetadata;
            case "MEDIUM": return { colour: "rgb(225, 148, 0)", index: 2 }  as IJobMetadata;
            case "URGENT": return { colour: "rgb(185, 19, 19)", index: 3 }  as IJobMetadata;
            case "EMERGENCY": return { colour: "rgb(75, 1, 96)", index: 4 }  as IJobMetadata;
            default: return { colour: "rgb(145, 145, 145)", index: 0 }  as IJobMetadata;
        }
    }

    private renderItem = (item: IJobBundle, id: string, index: number) => {
        const colour = item.metadata.colour;
        const job = item.job;
        return (
            <ResourceItem
              id={id}
              onClick={() => this.props.showJob(job)}
            >
                <span style={{ display: "inline-block" }}>
                    <div style={{ width: "1rem", height: "1rem", backgroundColor: colour, display: "inline-block", borderRadius: "1rem", marginRight: "1rem" }} />
                    <h3 style={{ lineHeight: "2.8rem", display: "inline-block" }}><TextStyle variation="strong">{job.summary}</TextStyle> ({(Math.round(job.distance * 100) / 100).toFixed(2)}m)</h3>
                </span>   
            </ResourceItem>
        );
    }

    render() {
        const items = this.props.jobs.map((item) => { 
            return { job: item, metadata: this.severityToMetadata(item) } as IJobBundle;
        });
        return (
            <ResourceList 
                items={items}
                renderItem={this.renderItem}
                resourceName={{singular: 'job', plural: 'jobs'}}
            />
        );
    }
}

export default JobList;