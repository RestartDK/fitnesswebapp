import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "./ui/button";
import { Input } from './ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { X } from 'lucide-react';
import { createTrainingPlan, scrapeMuscleGroups } from '../api/api';
import type { MuscleGroupTarget, TrainingPlan } from '../lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Day {
    day_of_week: string;
    exercises: ExerciseForm[];
    isFinished: boolean;
}

interface ExerciseForm {
    exercise_name: string;
    sets: number;
    reps: number;
    muscle_groups: MuscleGroupTarget[]; // Include muscle groups
}

interface FormData {
    planName: string;
    startDate: string;
    endDate: string;
    [key: string]: any; // for dynamic keys like `exerciseName${dayIndex}`
}

function TrainingPlanForm() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [days, setDays] = useState<Day[]>([]);
    const { register, handleSubmit, setValue } = useForm();

    // Function to fetch muscle groups for a given exercise
    const scrapeMuscleGroupsForExercise = async (exercise_name: string) => {
        const response = await scrapeMuscleGroups(exercise_name);
        return response;
    };

    const createMutation = useMutation({
        mutationFn: (data: TrainingPlan) => {
            return createTrainingPlan(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['newRegimenData']});
            toast.success("Successfully created the training plan!");
            navigate('/'); // Redirect to the homepage
        },
        onError: (error) => {
            // Handle error
            toast.error("Error has occured!");
        },
    });

    const onSubmit = async (data: FormData) => {
        // Process each day and exercise to fetch muscle groups
        const processedDays = await Promise.all(days.map(async (day) => {
            const processedExercises = await Promise.all(day.exercises.map(async (exercise) => {
                try {
                    const response = await scrapeMuscleGroupsForExercise(exercise.exercise_name);
                    // Keep 'muscle_group_name' as per your type definition
                    const muscleGroups = response.map(item => ({ muscle_group: item.muscle_group }));
                    return {
                        exercise: {
                            exercise_name: exercise.exercise_name,
                            muscle_groups: muscleGroups
                        },
                        sets: exercise.sets,
                        reps: exercise.reps
                    };
                } catch (error) {
                    console.error("Error fetching muscle groups for exercise:", exercise.exercise_name, error);
                    return {
                        exercise: {
                            exercise_name: exercise.exercise_name,
                            muscle_groups: [] // Handle error as needed
                        },
                        sets: exercise.sets,
                        reps: exercise.reps
                    };
                }
            }));

            return { day_of_week: day.day_of_week, exercises: processedExercises };
        }));

        const formattedData: TrainingPlan = {
            user: 1, // Assuming user ID is static for now
            plan_name: data.planName,
            slug: data.planName.toLowerCase().replace(/\s+/g, '-'),
            start_date: data.startDate,
            end_date: data.endDate,
            training_days: processedDays,
        };

        createMutation.mutate(formattedData);
    };

    const addExercise = (dayIndex, exerciseData) => {
        const updatedDays = [...days];
        updatedDays[dayIndex].exercises.push({
            exercise_name: exerciseData[`exercise_name${dayIndex}`],
            sets: exerciseData[`sets${dayIndex}`],
            reps: exerciseData[`reps${dayIndex}`],
            muscle_groups: [] // Initialize empty muscle groups
        });
        setDays(updatedDays);
        setValue(`exercise_name${dayIndex}`, '');
        setValue(`sets${dayIndex}`, '');
        setValue(`reps${dayIndex}`, '');
    };

    const removeExercise = (dayIndex, exerciseIndex) => {
        const updatedDays = [...days];
        updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
        setDays(updatedDays);
    };

    const addDay = () => {
        setDays([...days, { day_of_week: '', exercises: [], isFinished: false }]);
    };

    const finishDay = (dayIndex) => {
        const updatedDays = [...days];
        updatedDays[dayIndex].isFinished = true;
        setDays(updatedDays);
    };

    const removeDay = (dayIndex) => {
        setDays(days.filter((_, index) => index !== dayIndex));
    };

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex space-x-4">
                    <Input {...register("planName")} placeholder="Plan Name" className="w-full border-none text-xl"/>
                    <Input {...register("startDate")} placeholder="Start Date" type="date" className="w-full"/>
                    <Input {...register("endDate")} placeholder="End Date" type="date" className="w-full"/>
                </div>

                {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="mt-10">
                        <div className="flex gap-5 items-center">
                            <Input {...register(`day_of_week${dayIndex}`)} 
                                placeholder="Day Name" 
                                className="w-full text-lg border-none" 
                                onChange={e => {
                                    const updatedDays = [...days];
                                    updatedDays[dayIndex].day_of_week = e.target.value;
                                    setDays(updatedDays);
                                }}
                                value={day.day_of_week}/>
                            <Button onClick={() => removeDay(dayIndex)} className="bg-red-500 hover:bg-red-500/90">Remove Day</Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exercise Name</TableHead>
                                    <TableHead>Sets</TableHead>
                                    <TableHead>Reps</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {day.exercises.map((exercise, exerciseIndex) => (
                                    <TableRow key={exerciseIndex}>
                                        <TableCell>{exercise.exercise_name}</TableCell>
                                        <TableCell>{exercise.sets}</TableCell>
                                        <TableCell>{exercise.reps}</TableCell>
                                        <TableCell>
                                            {!day.isFinished && (
                                                <Button onClick={() => removeExercise(dayIndex, exerciseIndex)} className="bg-red-500 hover:bg-red-500/90" size="icon">
                                                    <X className="h-4 w-4" aria-hidden="true" />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {!day.isFinished && (
                            <>
                                <div className="flex space-x-4 mt-4">
                                    <Input {...register(`exercise_name${dayIndex}`)} placeholder="Exercise Name" className="w-full" />
                                    <Input {...register(`sets${dayIndex}`)} placeholder="Sets" type="number" className="w-full" />
                                    <Input {...register(`reps${dayIndex}`)} placeholder="Reps" type="number" className="w-full" />
                                    <Button type="button" onClick={() => handleSubmit(data => addExercise(dayIndex, data))()} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">Add Exercise</Button>
                                </div>
                            

                                <Button type="button" onClick={() => finishDay(dayIndex)} className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-4">Finish Day</Button>
                            </>
                        )}
                    </div>
                ))}
                <div className='flex gap-3'>
                    <Button type="button" onClick={addDay} className="bg-green-700 hover:bg-green-500 text-white">Add Day</Button>
                    <Button type="submit" className="bg-green-700 hover:bg-green-500 text-white">Submit Plan</Button>
                </div>
            </form>
        </div>
    );
}

export default function Editplan() {
    return (
        <div className="py-10">
            <header className="mx-auto max-w-7xl sm:px-6 lg:px-7">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">New Plan</h1>
            </header>
            <main className="h-screen mx-auto max-w-7xl sm:px-6 lg:px-8">
                <TrainingPlanForm />
            </main>
        </div>
    );
}
