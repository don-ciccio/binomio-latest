/**
 * Gets a scaled vector
 * @param {Vector} v
 * @param {Number} sc
 * @returns {Vector}
 */
export const vectorScaling = (v, sc) => {
    return [v[0] * sc[0], v[1] * sc[1]];
};

export const clamp = (value, clampAt = 30) => {
    if (value > 0) {
        return value > clampAt ? clampAt : value;
    } else {
        return value < -clampAt ? -clampAt : value;
    }
};

export const defaultStroke = (className) =>
    new RegExp("stroke-*", "g").test(className)
        ? ""
        : "stroke-2 stroke-skin-dark";

export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}

export function unslugify(str) {
    return str.replace(/-/g, " ");
}

export const generateUniqueArray = (num) => {
    let numbers = new Set();
    while (numbers.size < num) {
        let randomNum = Math.floor(Math.random() * (num - 1 + 1)) + 1;
        numbers.add(randomNum);
    }

    return Array.from(numbers);
};

export function IvaTax(totale, aliquotaIVA) {
    const imponibile = totale / ((100 + aliquotaIVA) / 100);
    const importoIVA = totale - imponibile;
    return importoIVA;
}
