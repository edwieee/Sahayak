export interface ServiceItem {
    id: string;
    title: string;
    keywords: string[];
    description: string;
    steps: string[];
    documents_required: string[];
    eligibility: string;
    where_to_apply: string;
    facility_type: string;
    notes: string;
}

export interface ServiceCategory {
    category: string;
    items: ServiceItem[];
}

export interface ServicesData {
    categories: ServiceCategory[];
}

export interface Facility {
    type: string;
    name: string;
    address: string;
    phone: string;
    lat: number;
    lng: number;
    category: string;
}
