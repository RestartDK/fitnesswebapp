import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import Error from "./Error";
import { TailSpin } from "react-loader-spinner";

interface Regimens {
    id: number;
    user: number;
    plan_name: string;
    start_date: string;
    end_date: string;
    workout_percentage: number;
}

interface TrainingDay {
    id: number;
    exercise: string;
    sets: number;
    reps: number;
    muscle_groups: string[];
}

// Define the expected parameters in the URL
type RouteParams = {
    plan_name: string;
};

const dummy = [
    { id: 0, exercise: 'Squats', reps: 99, sets: 3, muscle_groups: ['calves, biceps'] },
    { id: 1, exercise: 'Pistol Jumps', reps: 89, sets: 3, muscle_groups: ['quads, biceps'] }
];

const fetchTrainingPlan = async (plan_name: string) => {
    const res = await axios.get<Regimens>(`http://localhost:8000/api/training_plan/${plan_name}/`); 
    return res.data;
}

function Table() {
    return (
        <div className="py-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Your goal, Go get it.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Button className="bg-indigo-600 hover:bg-indigo-500">Add Exercise</Button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Sets
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Reps
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Muscle Group
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dummy.map((trainingDay) => (
                                <tr key={trainingDay.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {trainingDay.exercise}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{trainingDay.sets}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{trainingDay.reps}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{trainingDay.muscle_groups}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            Edit<span className="sr-only">, {trainingDay.exercise}</span>
                                        </a>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Trainingplan() {
    const { plan_name } = useParams<RouteParams>();
    const { isLoading, error, data } = useQuery({ queryKey: ['regimenData'], queryFn: () => plan_name ? fetchTrainingPlan(plan_name) : Promise.reject("Plan name is undefined") });
    console.log(data);

    if (isLoading) return <div className="flex justify-center items-center w-full h-full border-2">
        <TailSpin
        height="80"
        width="80"
        color="#6566F1"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
        />
    </div>

    if (error) return <div className="w-full h-full place-content-center">Error has occured!</div>

    return (
        <div>
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
            <div className="border-t border-gray-200">
                <Table />
            </div>
        </div>
    )
}