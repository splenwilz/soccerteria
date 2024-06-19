export const formatCurrency = ({ amount, currency }: { amount: number, currency: string }) => {
    const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
    }).format(amount)
    return formatted
}