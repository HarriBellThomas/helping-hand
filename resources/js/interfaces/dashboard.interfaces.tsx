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
    latitude: number,
    longitude: number,
    owner_name: string,
    summary: string,
    severity: string,
}
export interface IJobListProps {
    jobs: IJobDefinition[],
}