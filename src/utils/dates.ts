export function parseDateWithMidnight(date: any) {
    const [datePart, timePart] = new Date(date).toISOString().split('T')
    console.log('datePart', datePart)
    return `${datePart}T00:00:00.000Z`
}

export function oneMoreDay(date: any) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    return newDate
}
