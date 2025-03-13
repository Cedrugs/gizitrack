export interface School {
    id: number;
    name: string;
    address: string;
    city: string;
    distributions: Distribution[];
}

interface Distribution {
    id: number;
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
    on_time: boolean;
    lateness_time: number;
    rating: string;
    message: string;
}

interface Supplier {
    id: number;
    address: string;
    city: string;
    name: string;
}