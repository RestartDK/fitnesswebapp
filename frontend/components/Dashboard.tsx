import { Button, buttonVariants } from "./ui/button";
import { X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner'
import type { TrainingPlan } from "~/lib/types";
import { fetchTrainingPlanSimple, deleteTrainingPlan } from "../api/api";
import toast from "react-hot-toast";
import Error from "./Error";
import { useEffect } from "react";
interface StatsProps {
    workout_percentage: number;
}

function Stats({ workout_percentage }: StatsProps) {
    return (
        <div className="grid grid-cols-1 gap-px">
            <p className="text-sm font-medium leading-6 text-gray-400">Muscle Group Targeted</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-black">{workout_percentage ? `${Math.floor(workout_percentage)}%` : "N/A"}</p>
        </div>
    );
}

function RegimenList() {
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({ queryKey: ['regimenData'], queryFn: () => fetchTrainingPlanSimple() });

    console.log(data);

    const deleteMutation = useMutation({
        mutationFn: (slug: string) => {
            return deleteTrainingPlan(slug);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['regimenData']});
            toast.success("Successfully deleted the training plan!");
        },
        onError: (error) => {
            // Handle error
            toast.error("Error has occured!");
        },
    });

    const handleDelete = (slug: string) => {
        deleteMutation.mutate(slug);
    };

    if (isLoading) return <div className="flex justify-center items-center w-full h-full">
        <TailSpin
        height="80"
        width="80"
        color="#6566F1"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
        />
    </div>
    
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {data && data.map((regimen: TrainingPlan) => (
                <li key={regimen.id} className="flex items-center py-5">
                    <div className="flex-1 truncate">
                        <Link to={`/training_plan/${regimen.slug}`} className="text-2xl font-semibold leading-8 text-gray-900 hover:text-gray-700 truncate">{regimen.plan_name}</Link>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-x-4 ml-4">
                        <Stats workout_percentage={regimen.workout_percentage} />
                        <Button onClick={() => handleDelete(regimen.slug)} className="bg-red-500 hover:bg-red-500/90" size="icon">
                            <X className="h-4 w-4" aria-hidden="true" />
                        </Button>
                    </div>
                </li>
            ))}
            <Link className={buttonVariants({ variant: "default", className: "bg-indigo-600 hover:bg-indigo-500" })} to={`/editplan/`}>Add Regimen</Link>
        </ul>
    );
}


export default function Dashboard() {
    return (
        <div className="py-10">
            <header className="mx-auto max-w-7xl sm:px-6 lg:px-7">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">Training Regime</h1>
            </header>
            <main className="h-screen mx-auto py-6 max-w-7xl sm:px-6 lg:px-8">
                <RegimenList />
            </main>
        </div>
    );
}
