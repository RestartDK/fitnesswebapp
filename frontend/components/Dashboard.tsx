import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { X } from "lucide-react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Regimens {
    id: number;
    user: number;
    plan_name: string;
    start_date: string;
    end_date: string;
    workout_percentage: number;
}

interface StatsProps {
    workout_percentage: number;
}

export const fetchScraperTest = async () => {
    const res = await axios.get(`http://localhost:8000/api/training_plan/`);

    return res.data;
}

function Stats({ workout_percentage }: StatsProps) {
    return (
        <div className="grid grid-cols-1 gap-px">
            <p className="text-sm font-medium leading-6 text-gray-400">Muscle Group Targeted</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-black">{workout_percentage ? `${Math.floor(workout_percentage)}%` : "Not Found"}</p>
        </div>
    );
}

function RegimenList() {
    // Access the client
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({ queryKey: ['regimenData'], queryFn: () => fetchScraperTest() });

    if (isLoading) return <div className="w-full h-full place-content-center"><Progress /></div>

    if (error) return <div className="w-full h-full place-content-center">An error has occurred: {error.message}</div>
    
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {data.map((regimen: Regimens) => (
                <li key={regimen.id} className="flex items-center py-5">
                    <div className="flex-1 truncate">
                        <p className="text-2xl font-semibold leading-8 text-gray-900 truncate">{regimen.plan_name}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-x-4 ml-4">
                        <Stats workout_percentage={regimen.workout_percentage} />
                        <Button className="bg-indigo-600 hover:bg-indigo-500" size="icon">
                            <X className="h-4 w-4" aria-hidden="true" />
                        </Button>
                    </div>
                </li>
            ))}
            <Button className="bg-indigo-600 hover:bg-indigo-500">Add Regimen</Button>
        </ul>
    );
}


export default function Dashboard() {
    return (
        <div className="py-10">
            <header className="mx-auto max-w-7xl sm:px-6 lg:px-7">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">Training Regime</h1>
            </header>
            <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <RegimenList />
            </main>
        </div>
    );
}
