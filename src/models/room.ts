export interface Room {
    _id?: string
    number: number
    section: string
    pricePerNight: number
    beds: number
    image: string
    reserved: boolean
    dateOccupied: Date[]
    created_at?: Date
}
