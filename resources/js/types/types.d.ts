export interface School {
    id: number;
    name: string;
    address: string;
    city: string;
    distributions: Distribution[];
}

interface DistributionSchool {
    id: number;
    name: string;
}

interface Distribution {
    id: number;
    school: DistributionSchool;
    supplier: Supplier;
    delivery: Delivery;
    feedback: Feedback;
}

interface Delivery {
    id: number;
    date_sent: string;
    delivery_status: string;
    distribution_id: number;
    menu: string;
    num_portion: number;
    price: float;
    time_sent: string;
}

interface Feedback {
    id: number;
    delivery_status: string;
    distribution_id: number;
    menu: string;
    num_portion: number;
    price: float;
    on_time: number;
    lateness_time: number;
    rating: string;
    message: string;
    problem: string;
}

interface Supplier {
    id: number;
    address: string;
    city: string;
    name: string;
    distributions: Distribution[];
    eligible_schools: School[] | null;
}