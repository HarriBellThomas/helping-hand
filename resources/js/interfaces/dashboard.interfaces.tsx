export interface IDashboardProps {
    baseUrl: string,
    user: {
        name: string,
        email: string,
        picture: string,
    }
}

export interface IHelpingMapProps {
    updateJobs: (lat: number, long: number, radius: number) => void,
    jobs: IJobDefinition[],
    latitude: number,
    longitude: number,
    radius: number,
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