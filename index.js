// Import faker
import { faker } from '@faker-js/faker';

function generateFitnessPlan(ageRange, bodyType, goal, fatRange, focusArea, fitnessLevel, equipment, timesPerWeek) {
    // Determine workout intensity based on fitness level and age
    let intensity = fitnessLevel > 7 ? 'high' : fitnessLevel > 4 ? 'moderate' : 'low';
    if (['50-59', '60+'].includes(ageRange) && fitnessLevel <= 5) {
        intensity = 'low';
    }

    // Tailor workout type based on goals and body type
    let workoutType;
    switch (goal) {
        case 'gain muscle mass':
            workoutType = 'strength training';
            break;
        case 'get shredded':
            workoutType = 'HIIT and strength training';
            break;
        case 'lose weight':
            workoutType = 'cardio with strength training';
            if (bodyType === 'heavy') {
                workoutType += ' and high-repetition strength training';
            }
            break;
        case 'maintain fitness':
            workoutType = 'balanced';
            break;
    }

    // Adjust intensity based on body type and fat range
    if (bodyType === 'slim' && goal === 'gain muscle mass') {
        intensity = 'moderate'; // Ensure slim individuals don't over-exert
    } else if (bodyType === 'heavy' && ['30-34%', '35-39%', '40+%'].includes(fatRange)) {
        intensity = 'moderate to high'; // Prioritize fat burning
    } else if (bodyType === 'average' && fatRange > '25-29%') {
        intensity = 'moderate'; // Balance between fat loss and muscle gain
    }

    // Modify workout frequency and equipment use
    let equipmentExercises;
    switch (equipment) {
        case 'no equipment':
            equipmentExercises = 'bodyweight exercises';
            break;
        case 'basic equipment':
            equipmentExercises = 'dumbbells and resistance bands';
            break;
        case 'full equipment':
            equipmentExercises = 'gym machinery and free weights';
            break;
    }

    // Focus area consideration
    let focusExercises;
    switch (focusArea) {
        case 'legs':
            focusExercises = ['squats', 'lunges', 'leg press'];
            break;
        case 'belly':
            focusExercises = ['planks', 'crunches', 'leg raises'];
            break;
        case 'arms':
            focusExercises = ['push-ups', 'bicep curls', 'tricep dips'];
            break;
        case 'chest':
            focusExercises = ['bench press', 'push-ups', 'chest fly'];
            break;
        case 'back':
            focusExercises = ['deadlifts', 'pull-ups', 'rows'];
            break;
        case 'full body':
            focusExercises = ['burpees', 'deadlifts', 'mountain climbers'];
            break;
    }

    // Adjust workout plan based on frequency and intensity
    const frequencyIntensity = {
        1: `${intensity} intensity, ${timesPerWeek} times per week`,
        2: `${intensity} intensity, ${timesPerWeek} times per week`,
        3: `${intensity} intensity, ${timesPerWeek} times per week`,
        4: `${intensity} intensity, ${timesPerWeek} times per week`,
        5: `${intensity} intensity, ${timesPerWeek} times per week`,
        6: `${intensity} intensity, ${timesPerWeek} times per week`,
        7: `${intensity} intensity, ${timesPerWeek} times per week`,
    }[timesPerWeek];

    // Generate the recommended fitness plan
    return {
        workoutType: workoutType,
        intensity: intensity,
        frequencyIntensity: frequencyIntensity,
        equipment: equipmentExercises,
        focusExercises: focusExercises,
        recommendedPlan: `${workoutType} with ${equipmentExercises}, focusing on ${focusArea} with ${intensity} intensity, ${timesPerWeek} times per week.`,
    };
}

// Generate an array with fake data
const dataArray = [];
for (let i = 0; i < 60; i++) {
    const ageRange = faker.helpers.arrayElement(['18-29', '30-39', '40-49', '50-59', '60+']);
    const bodyType = faker.helpers.arrayElement(['slim', 'average', 'heavy']);
    const goal = faker.helpers.arrayElement(['gain muscle mass', 'get shredded', 'lose weight', 'maintain fitness']);
    const fatRange = faker.helpers.arrayElement(['5-9%', '10-14%', '15-19%', '20-24%', '25-29%', '30-34%', '35-39%', '40+%']);
    const focusArea = faker.helpers.arrayElement(['legs', 'belly', 'arms', 'chest', 'back', 'full body']);
    const fitnessLevel = faker.number.int({ min: 1, max: 10 });
    const equipment = faker.helpers.arrayElement(['no equipment', 'basic equipment', 'full equipment']);
    const timesPerWeek = faker.number.int({ min: 1, max: 7 });

    dataArray.push({
        age_range: ageRange,
        body_type: bodyType,
        goal: goal,
        body_fat_range: fatRange,
        focus_area: focusArea,
        fitness_level: fitnessLevel,
        equipment: equipment,
        times_per_week: timesPerWeek,
        fitness_plan: generateFitnessPlan(ageRange, bodyType, goal, fatRange, focusArea, fitnessLevel, equipment, timesPerWeek).recommendedPlan
    });
}

// Log the result
console.log("age_range,body_type,goal,body_fat_range,focus_area,fitness_level,equipment,times_per_week,fitness_plan")
dataArray
    .forEach(data => {
        console.log(`${data.age_range},${data.body_type},${data.goal},${data.body_fat_range},${data.focus_area},${data.fitness_level},${data.equipment},${data.times_per_week},"${data.fitness_plan}"`);
    });
