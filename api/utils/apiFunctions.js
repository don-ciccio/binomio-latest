function capitalizeFirstLetter(str) {
    var firstCodeUnit = str[0];

    if (firstCodeUnit < "\uD800" || firstCodeUnit > "\uDFFF") {
        return str[0].toUpperCase() + str.slice(1);
    }

    return str.slice(0, 2).toUpperCase() + str.slice(2);
}

/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad === "undefined") {
    Number.prototype.toRad = function () {
        return (this * Math.PI) / 180;
    };
}

// start and end are objects with latitude and longitude
//decimals (default 2) is number of decimals in the output
//return is distance in kilometers.
function getDistance(start, end, decimals) {
    decimals = decimals || 2;
    var earthRadius = 6371; // km
    lat1 = parseFloat(start.lat);
    lat2 = parseFloat(end.lat);
    lon1 = parseFloat(start.lng);
    lon2 = parseFloat(end.lng);

    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

const clone = (obj) => Object.assign({}, obj);
const renameKey = (object, key, newKey) => {
    const clonedObj = clone(object);
    const targetKey = clonedObj[key];

    delete clonedObj[key];

    clonedObj[newKey] = targetKey;

    return clonedObj;
};

function generateSlots() {
    let slots = [];
    const intervalMillis = 30 * 60 * 1000;

    for (var i = 0; i < 48; i++) {
        slots.push({ time: intervalMillis * i, active: false });
    }

    return slots;
}

function generateWeek() {
    let days = [];
    for (var i = 0; i < 7; i++) {
        const dayOfTheWeek = new Date(new Date().getFullYear(), 0, i).getDay();

        if (dayOfTheWeek === 0) {
            days.push({
                day: new Date(new Date().getFullYear(), 0, i),
                available: false,
                blackOutDay: false,
                slotTime: generateSlots(),
            });
        } else {
            days.push({
                /*  startHours: generateOpeningHours(),
                endHours: generateOpeningHours(), */
                day: new Date(new Date().getFullYear(), 0, i),
                available: true,
                blackOutDay: false,
                slotTime: generateSlots(),
            });
        }
    }
    return days;
}

function generateDays() {
    let days = [];
    for (let i = 1; i < 366; i++) {
        const dayOfTheWeek = new Date(new Date().getFullYear(), 0, i).getDay();
        if (dayOfTheWeek === 0) {
            days.push({
                /* startHours: generateOpeningHours(),
                endHours: generateOpeningHours(), */
                day: new Date(new Date().getFullYear(), 0, i),
                available: false,
                blackOutDay: false,
                slotTime: generateSlots(),
            });
        } else {
            days.push({
                /*  startHours: generateOpeningHours(),
                endHours: generateOpeningHours(), */
                day: new Date(new Date().getFullYear(), 0, i),
                available: true,
                blackOutDay: false,
                slotTime: generateSlots(),
            });
        }
    }

    return days;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    asyncForEach,
    capitalizeFirstLetter,
    getDistance,
    renameKey,
    generateDays,
    generateWeek,
};
