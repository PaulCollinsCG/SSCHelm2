const currencyFormatter = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency : "GBP",
    maximumFractionDigits : 0,
});

export default currencyFormatter;