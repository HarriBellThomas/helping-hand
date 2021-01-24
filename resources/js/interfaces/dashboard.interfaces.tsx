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
    panToLatitude: number,
    panToLongitude: number,
    panIncrement: number,
    showCircle: boolean,
}

export interface IJobDefinition {
    id: string,
    latitude: number,
    longitude: number,
    owner_name: string,
    summary: string,
    severity: string,
    distance: number,
}
export interface IJobListProps {
    jobs: IJobDefinition[],
    showJob: (job: IJobDefinition) => void,
}

export interface IAddJobModalProps {
    openModal: boolean,
    onClose: () => void,
}