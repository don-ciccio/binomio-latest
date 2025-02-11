export const storage = {
    getToken: () => JSON.parse(window.localStorage.getItem("token")),
    setToken: (token) =>
        window.localStorage.setItem("token", JSON.stringify(token)),
    clearToken: () => window.localStorage.removeItem("token"),
};

export const formatCurrency = (amount = 0, currency = "EUR") =>
    new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency,
    }).format(amount);

export function IvaTax(totale, aliquotaIVA) {
    const imponibile = totale / ((100 + aliquotaIVA) / 100);
    const importoIVA = totale - imponibile;
    return importoIVA;
}
