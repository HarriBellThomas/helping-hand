export interface IDashboardProps {
    baseUrl: string,
    user: {
        name: string,
        picture: string,
    }
}

export interface IHelpingMapProps {
    latitude: number,
    longitude: number,
    radius: number,
}

export interface IJobDefinition {
    id: string,
    lat: number,
    long: number,
    owner_name: string,
    summary: string,
}