import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface Regimens {
    id: number;
    user: number;
    plan_name: string;
    start_date: string;
    end_date: string;
    workout_percentage: number;
}

// Define the expected parameters in the URL
type RouteParams = {
    plan_name: string;
};

export const fetchTrainingPlan = async (plan_name: string) => {
    const res = await axios.get<Regimens>(`http://localhost:8000/api/training_plan/${plan_name}/`); 
    return res.data;
}

export default function Trainingplan() {
    const { plan_name } = useParams<RouteParams>();
    const { isLoading, error, data } = useQuery({ queryKey: ['regimenData'], queryFn: () => plan_name ? fetchTrainingPlan(plan_name) : Promise.reject("Plan name is undefined") });
    console.log(data);

    if (isLoading) return <div className="w-full h-full place-content-center"><Progress /></div>

    if (error) return <div className="w-full h-full place-content-center">An error has occurred: {error.message}</div>

    return (
        <div className="md:flex md:items-center md:justify-between py-6">
            <div className="min-w-0 flex-1">
                <h2 className="text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {data?.plan_name}
                </h2>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
                <Button variant={"outline"}>Edit</Button>
                <Button variant={"destructive"}>Delete</Button>
            </div>
        </div>
    )
}