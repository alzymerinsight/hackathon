class Patient {
    constructor(name, age, gender, medical_history, cognitive_function, behavioral_symptoms) {
        this.name = name.toLowerCase();
        this.age = age;
        this.gender = gender;
        this.medical_history = medical_history.map(ele => ele.toLowerCase());
        this.cognitive_function = cognitive_function.map(ele => ele.toLowerCase());
        this.behavioral_symptoms = behavioral_symptoms.map(ele => ele.toLowerCase());
    }
}

class AI {
    constructor() {}

    rule_based_treatment_plan(patient) {
        let treatment_plan = [];
        let prediction = [];
        
        let behavioral = 0;
        let med = 0;
        let moderate = 0;
        let flag = 0;

        // Medication management
        if (patient.cognitive_function.includes("mild cognitive impairment")) {
            treatment_plan.push("Prescribe cholinesterase inhibitor (e.g., donepezil).");
        } else if (patient.cognitive_function.includes("moderate cognitive impairment")) {
            treatment_plan.push("Prescribe memantine.");
            moderate = 1;
        } else if (patient.cognitive_function.includes("heavy cognitive impairment")) {
            flag = 1;
            treatment_plan.push("Need intensive care");
        }

        // Non-pharmacological interventions
        if (patient.behavioral_symptoms.includes("agitation")) {
            treatment_plan.push("Implement behavioral therapy techniques for agitation.");
            behavioral += 1;
        }
        if (patient.behavioral_symptoms.includes("sleep disturbances")) {
            treatment_plan.push("Recommend sleep hygiene practices for sleep disturbances.");
            behavioral += 1;
        }
        if (patient.behavioral_symptoms.includes("hallucinations")) {
            treatment_plan.push("Assess for potential medication adjustments or additional therapy.");
            behavioral += 1;
        }
        if (patient.behavioral_symptoms.includes("depression")) {
            treatment_plan.push("Selective Serotonin Reuptake Inhibitors (SSRIs) such as sertraline, citalopram, or escitalopram, Psychotherapy, Reminiscence therapy and Art therapy");
            behavioral += 1;
        }
        if (patient.behavioral_symptoms.includes("anxiety")) {
            treatment_plan.push("Cognitive-behavioral therapy (CBT), Benzodiazepines such as lorazepam or diazepam may also be used and medications such as buspirone or hydroxyzine may also be considered");
            behavioral += 1;
        }
        if (patient.behavioral_symptoms.includes("aggression")) {
            treatment_plan.push("Antipsychotic medications and Sensory stimulation.");
            behavioral += 1;
        }
        if (patient.behavioral_symptoms.includes("self isolation")) {
            treatment_plan.push("Engage in activities.");
        }
        
        // Lifestyle modifications
        if (patient.medical_history.includes("hypertension")) {
            treatment_plan.push("Monitor blood pressure regularly and adjust medication as needed.");
            med += 1;
        }
        if (patient.medical_history.includes("diabetes")) {
            treatment_plan.push("Monitor blood sugar levels regularly and adjust medication as needed.");
            med += 1;
        }
        if (patient.medical_history.includes("heart disease")) {
            treatment_plan.push("Monitor cardiovascular health and recommend appropriate lifestyle changes.");
            med += 1;
        }
        
        if (flag > 0 && behavioral > 4 && med > 1) {
            prediction.push("Dementia Predicted");
        }
        if (moderate === 1 && behavioral > 2 && med > 2) {
            prediction.push("Possibility of Mild dementia");
        }
        if ((flag === 0 && moderate === 0) || (behavioral < 3 && med < 2)) {
            prediction.push("Keep yourself healthy");
        }
        if (prediction.length !== 0) {
            console.log(prediction[0]);
        }
        
        return treatment_plan;
    }
}

function main() {
    // Sample patient data
    const patient1 = new Patient(
        "John Doe",
        70,
        "Male",
        ["Hypertension", "Type 2 Diabetes", "Heart disease"],
        ["mild cognitive impairment"],
        ["agitation", "sleep disturbances", "hallucinations", "depression", "anxiety", "aggression"]
    );

    // Initialize AI
    const ai = new AI();

    // Predict treatment plan
    const treatment_plan = ai.rule_based_treatment_plan(patient1);

    // Print treatment plan
    console.log("Treatment Plan for", patient1.name + ":");
    console.log("Refer to specialist for advanced care the medications should be used with caution due to the risk of serious side effects such as stroke, confusion, and sedation..");
    treatment_plan.forEach((action, index) => {
        console.log(${index + 1}. ${action});
    });
}

main();