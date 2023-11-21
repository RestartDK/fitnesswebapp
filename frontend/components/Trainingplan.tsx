import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { TailSpin } from "react-loader-spinner";
import { TrainingPlan } from "~/lib/types";
import { X, Pen, Plus } from "lucide-react";
import { deleteTrainingPlan, fetchTrainingPlan } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";



// Define the expected parameters in the URL
type RouteParams = {
    plan_name: string;
};

interface TableProps {
    trainingPlan: TrainingPlan; // Define the prop type
};

function Table({ trainingPlan }: TableProps) {
    return (
        <div className="py-6 mt-8 flow-root">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="flex flex-col gap-10 min-w-full py- align-middle sm:px-6 lg:px-8">
                    {trainingPlan?.training_days.map((trainingDay) => (
                        <div key={trainingDay.id}>
                            <h3 className="text-xl font-bold pb-3">{trainingDay.day_of_week}</h3>
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
                                    {trainingDay?.exercises.map((exercise) => (
                                        <tr key={exercise.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {exercise.exercise.exercise_name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.sets}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.reps}</td>
                                            <td className="px-3 py-4 text-sm w-1/2 text-gray-500">
                                                {exercise.exercise.muscle_groups.map(mg => mg.muscle_group).join(', ')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default function Trainingplan() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { slug } = useParams<RouteParams>();

    const { isLoading, error, data } = useQuery({ queryKey: ['regimenSingleData'], queryFn: () => fetchTrainingPlan(slug) });

    const deleteMutation = useMutation({
        mutationFn: (slug: string) => {
            return deleteTrainingPlan(slug);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['regimenSingleData']});
            toast.success("Successfully deleted the training plan!");
            navigate('/'); // Redirect to the homepage
        },
        onError: (error) => {
            // Handle error
            toast.error("Error has occured!");
        },
    });

    if (isLoading) return <div className="flex justify-center items-center w-full h-screen">
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
        <div className="">
            <div className="md:flex md:items-center md:justify-between py-6">
                <div className="min-w-0 flex-1">
                    <h2 className="text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {data?.plan_name}
                    </h2>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                    <Button variant={"destructive"} onClick={() => deleteMutation.mutate(slug)}> <X className="mr-2 h-4 w-4" /> Delete</Button>
                </div>
            </div>
            <div className="border-t border-gray-200">
                {data && data.training_days && <Table trainingPlan={data} />}
            </div>
        </div>
    )
}