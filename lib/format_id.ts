export function formatOrderId(orderId: string): string {
    // Example: Format the first 3, next 5, and last 2 characters of the ID
    const part1 = orderId.slice(0, 3);
    const part2 = orderId.slice(3, 8);
    const part3 = orderId.slice(8, 10);

    return `${part1}-${part2}-${part3}`;
}