import { Button } from "./button";
import { X } from "lucide-react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Regimens {
    name: string;
    muscleGroupsNum: number;
    value: string;
}

interface StatsProps {
    value: string;
}

const regimens: Regimens[] = [
    {
        name: "Push Pull Legs blah blah",
        muscleGroupsNum: 3,
        value: '90%',
    },
    {
        name: "Full Body",
        muscleGroupsNum: 10,
        value: '60%',
    },
    {
        name: "No Legs",
        muscleGroupsNum: 10,
        value: '10%',
    },
    {
        name: "Pain",
        muscleGroupsNum: 10,
        value: '0%',
    }
];

export const fetchScraperTest = async (exercise: string) => {
    const res = await axios.get(`http://localhost:8000/api/scraper/exercisemuscle/${exercise}/`);

    return res.data;
}

function Stats({ value }: StatsProps) {
    return (
        <div className="grid grid-cols-1 gap-px">
            <p className="text-sm font-medium leading-6 text-gray-400">Muscle Group Targeted</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-black">{value ? value : "Not Found"}</p>
        </div>
    );
}

function RegimenList() {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {regimens.map((regimen) => (
                <li key={regimen.name} className="flex items-center py-5">
                    <div className="flex-1 truncate">
                        <p className="text-2xl font-semibold leading-8 text-gray-900 truncate">{regimen.name}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-x-4 ml-4">
                        <Stats value={regimen.value} />
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
    // Access the client
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({ queryKey: ['scraperData'], queryFn: () => fetchScraperTest("pushdown") });

    console.log(data);

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
