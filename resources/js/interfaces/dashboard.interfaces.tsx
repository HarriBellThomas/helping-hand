export interface IDashboardProps {
    baseUrl: string,
    user: {
        name: string,
        picture: string,
    }
}

export interface IHelpingMapProps {
    updateJobs: (lat: number, long: number, radius: number) => void,
    jobs: IJobDefinition[],
}

export interface IJobDefinition {
    id: string,
    lat: number,
    long: number,
    owner_name: string,
    summary: string,
    severity: "LOW" | "MEDIUM" | "URGENT" | "EMERGENCY";
}
export interface IJobListProps {
    jobs: IJobDefinition[],
}