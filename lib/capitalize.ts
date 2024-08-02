
export function capitalizeTitle(title: string): string {
    return title.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
