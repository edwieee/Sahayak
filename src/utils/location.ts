import { Facility } from "../types/services";

export const MOCK_FACILITIES: Facility[] = [
    {
        type: "Government Hospital",
        name: "General Hospital, Irinjalakuda",
        address: "Tana, Irinjalakuda, Kerala 680121",
        phone: "0480 282 0231",
        lat: 10.3344,
        lng: 76.2023,
        category: "Healthcare"
    },
    {
        type: "Primary Health Centre",
        name: "PHC Porathissery",
        address: "Porathissery, Irinjalakuda, Kerala 680125",
        phone: "0480 283 1450",
        lat: 10.3521,
        lng: 76.1955,
        category: "Healthcare"
    },
    {
        type: "District Hospital",
        name: "District General Hospital, Thrissur",
        address: "Palace Rd, Thrissur, Kerala 680001",
        phone: "0487 233 4311",
        lat: 10.5276,
        lng: 76.2144,
        category: "Healthcare"
    },
    {
        type: "Akshaya Center",
        name: "Akshaya Center - Main Road",
        address: "Main Rd, Irinjalakuda, Kerala 680121",
        phone: "0480 282 8899",
        lat: 10.3411,
        lng: 76.2055,
        category: "Government"
    },
    {
        type: "Common Service Center (CSC)",
        name: "CSC Digital Seva Kendra",
        address: "Bus Stand Complex, Irinjalakuda",
        phone: "91 94464 55667",
        lat: 10.3388,
        lng: 76.2011,
        category: "Documents"
    },
    {
        type: "Taluk Office",
        name: "Mukundapuram Taluk Office",
        address: "Civil Station, Irinjalakuda",
        phone: "0480 282 0243",
        lat: 10.3355,
        lng: 76.2044,
        category: "Legal Aid"
    },
    {
        type: "Bank Branch",
        name: "State Bank of India - IJK Branch",
        address: "Opp. Municipality, Irinjalakuda",
        phone: "0480 282 0256",
        lat: 10.3366,
        lng: 76.2033,
        category: "Jobs"
    },
    {
        type: "RTO Office",
        name: "Sub RTO Irinjalakuda",
        address: "Civil Station, Irinjalakuda",
        phone: "0480 283 2323",
        lat: 10.3350,
        lng: 76.2040,
        category: "Transport"
    },
    {
        type: "Government School",
        name: "G.H.S.S Irinjalakuda",
        address: "Main Road, Irinjalakuda",
        phone: "0480 282 0554",
        lat: 10.3399,
        lng: 76.2066,
        category: "Education"
    }
];

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export const getNearestFacilityByCategory = (lat: number, lng: number, category: string) => {
    const facilities = MOCK_FACILITIES.filter(f => (f as any).category === category);
    if (facilities.length === 0) return null;

    return facilities.reduce((prev, curr) => {
        const distPrev = calculateDistance(lat, lng, prev.lat, prev.lng);
        const distCurr = calculateDistance(lat, lng, curr.lat, curr.lng);
        return distPrev < distCurr ? prev : curr;
    });
};

