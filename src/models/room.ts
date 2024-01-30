export interface Room {
    id: String
    number: number
    section?: String
    pricePerNight: number
    image?: String
    reserved?: boolean
    beds: number
}
