const Continents = [
    { key: 1, value: "Asia" },
    { key: 2, value: "Europe" },
    { key: 3, value: "North America" },
    { key: 4, value: "South America" },
    { key: 5, value: "Australia" },
    { key: 6, value: "Africa" },
];

const Prices = [
    { key: 1, name: "Any", array: [0, 1500000] },
    { key: 2, name: "$0 to $199", array: [0, 199] },
    { key: 3, name: "$200 to $249", array: [200, 249] },
    { key: 4, name: "$250 to $279", array: [250, 279] },
    { key: 5, name: "$280 to $299", array: [280, 299] },
    { key: 6, name: "More than $300", array: [300, 1500000] },
];

export { Continents, Prices };
