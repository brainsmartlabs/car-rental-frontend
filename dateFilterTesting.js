let cars = [
    {
        "name": "Tata Altroz",
        "bookedTimeSlots": [{ from: "19/11/2022", to: "20/11/2022" }, { from: "8/11/2022", to: "9/11/2022" }],
    },
    {
        "name": "Mahindra XUV700",
        "bookedTimeSlots": [{ from: "22/11/2022", to: "25/11/2022" }],
    },
    {
        "name": "Tata Nexon",
        "bookedTimeSlots": [],
    },
    {
        "name": "Huindai i20",
        "bookedTimeSlots": [],
    },
    {
        "name": "MG Astor",
        "bookedTimeSlots": [],
    },
    {
        "name": "Hyundai Creta",
        "bookedTimeSlots": [],
    },
    {
        "name": "Maruti Baleno",
        "bookedTimeSlots": [],
    },
    {
        "name": "Toyota Glanza",
        "bookedTimeSlots": [],
    }
];

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
    if (b_start < a_start && a_end < b_end) return true; // a in b
    return false;
}

function convertToDate(dateString) {
    let dateArray = dateString.split('/');
    let strReConstruct = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

    return new Date(strReConstruct);
}

let selectedFrom = '18/11/2022';
let selectedTo = '25/11/2022';


let temp = [];
for (let car of cars) {
    if (car.bookedTimeSlots.length === 0) {
        console.log(`Bookings Empty, pushing ${car.name} !!`);
        temp.push(car);
    }
    else {
        console.log(`Bookings Exists for ${car.name} !!`);
        let isOverlap = false;
        for (let booking of car.bookedTimeSlots) {
            let a_start = convertToDate(selectedFrom);
            let a_end = convertToDate(selectedTo);
            let b_start = convertToDate(booking.from);
            let b_end = convertToDate(booking.to);

            let checkOverlap = dateRangeOverlaps(a_start, a_end, b_start, b_end);
            console.log("is Overlap : " + isOverlap);
            if (checkOverlap) isOverlap = true;
        }
        if (isOverlap) {
            console.log(`Over lap exisits, so not adding ${car.name}`);
        } else {
            console.log(`No ovelap : pushing ${car.name}`);
            temp.push(car);
        }
    }
}

console.log(temp);
