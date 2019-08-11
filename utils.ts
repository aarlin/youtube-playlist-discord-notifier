export function removeTime(date: Date) {
    return date.setHours(0, 0, 0, 0);
}