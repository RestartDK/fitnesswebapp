export interface MuscleGroup {
    id: number;
    muscle_group: string;
}

export interface Exercise {
    id?: number;
    exercise_name: string;
    muscle_groups: MuscleGroup[];
}

export interface DayExercise {
    id?: number;
    exercise: Exercise;
    sets: number;
    reps: number;
}

export interface TrainingDay {
    id?: number; 
    training_plan?: number; // Optional field based on your serializer
    day_of_week: string;
    exercises: DayExercise[];
}

export interface TrainingPlan {
    id?: number;
    user: number; 
    plan_name: string;
    slug: string;
    start_date: string;
    end_date: string;
    training_days: TrainingDay[];
}

export interface MuscleGroupTarget {
    muscle_group: string;
    target_level: 'Some' | 'Yes';
}

export type TrainingPlans = TrainingPlan[];
