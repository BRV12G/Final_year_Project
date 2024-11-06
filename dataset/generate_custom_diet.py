import pandas as pd

# Load your dataset
file_path = 'Sleep_health_and_lifestyle_custom_diet.csv'
data = pd.read_csv(file_path)

data['Sleep Disorder'].fillna("None", inplace=True)

# Constants for meal recommendations
MEALS = {
    "breakfast": {
        "Underweight": "Paratha with butter or ghee, paneer or scrambled eggs, banana shake.",
        "Normal": "Idli or poha with vegetables, fresh fruit juice.",
        "Overweight": "Oats or ragi porridge with nuts, and a bowl of fruits.",
        "Obese": "Oats or ragi porridge with nuts, and a bowl of fruits."
    },
    "lunch": {
        "high_activity": "Roti, dal, paneer or chicken, vegetable sabzi, and salad for protein.",
        "low_activity": "Light dal or sambar, vegetable curry, roti, and a small bowl of curd.",
        "medium_activity": "Roti or rice, mixed dal, vegetable curry, and a bowl of curd."
    },
    "evening_snack": {
        "high_stress_or_poor_sleep": "Herbal tea with tulsi or chamomile, handful of mixed nuts.",
        "normal": "Fresh fruit or a smoothie, or some roasted chana or makhana."
    },
    "dinner": {
        "Sleep Apnea": "Vegetable soup with moong dal khichdi, avoid spicy or heavy foods.",
        "Overweight": "Stir-fried vegetables with a light dal or grilled paneer.",
        "Obese": "Stir-fried vegetables with a light dal or grilled paneer.",
        "default": "Roti, light curry, and some salad or a bowl of soup."
    }
}

# Function to generate meal recommendations based on health metrics
def generate_meal_recommendations(row):
    bmi = row['BMI Category']
    sleep_quality = row['Quality of Sleep']
    stress_level = row['Stress Level']
    physical_activity = row['Physical Activity Level']
    sleep_disorder = row['Sleep Disorder']

    # Breakfast
    breakfast = MEALS["breakfast"].get(bmi, MEALS["breakfast"]["Normal"])

    # Lunch
    if physical_activity > 50:
        lunch = MEALS["lunch"]["high_activity"]
    elif physical_activity < 30:
        lunch = MEALS["lunch"]["low_activity"]
    else:
        lunch = MEALS["lunch"]["medium_activity"]

    # Evening Snack
    if stress_level > 7 or sleep_quality < 5:
        evening_snack = MEALS["evening_snack"]["high_stress_or_poor_sleep"]
    else:
        evening_snack = MEALS["evening_snack"]["normal"]

    # Dinner
    if sleep_disorder == "Sleep Apnea":
        dinner = MEALS["dinner"]["Sleep Apnea"]
    elif bmi in ["Overweight", "Obese"]:
        dinner = MEALS["dinner"]["Overweight"]
    else:
        dinner = MEALS["dinner"]["default"]

    return breakfast, lunch, evening_snack, dinner

# Function to generate nutritional needs recommendations
def generate_nutritional_needs(row):
    bmi = row['BMI Category']
    physical_activity = row['Physical Activity Level']

    if bmi == "Underweight":
        return "Focus on calorie-dense foods with balanced proteins, fats, and carbohydrates. Include nuts and dairy for healthy fats."
    elif bmi == "Normal":
        return "Balanced intake of protein, complex carbohydrates, and fiber. Moderate fat intake with healthy oils and seeds."
    else:
        return "Low-calorie, high-fiber diet with lean proteins. Emphasize vegetables, whole grains, and avoid refined sugars."

# Function to identify health issues
def identify_health_issues(row):
    issues = []
    if row['BMI Category'] in ["Underweight", "Overweight", "Obese"]:
        issues.append("BMI is not in the normal range.")
    if row['Quality of Sleep'] < 5:
        issues.append("Inadequate sleep quality.")
    if row['Blood Pressure'] not in ["120/80", "125/80"]:
        issues.append("Blood pressure not within optimal range.")
    if row['Stress Level'] > 7:
        issues.append("High stress level.")
    if row['Daily Steps'] < 5000:
        issues.append("Low daily activity level.")
    if row['Sleep Disorder'] != "None":
        issues.append("Presence of sleep disorder.")
    return ", ".join(issues) if issues else "No major issues"

# Function to determine health status
def determine_health_status(row):
    unhealthy_conditions = [
        row['BMI Category'] in ["Underweight", "Overweight", "Obese"],
        row['Quality of Sleep'] < 5,
        row['Stress Level'] > 7,
        row['Daily Steps'] < 5000,
        row['Sleep Disorder'] != "None",
        row['Heart Rate'] > 100 or row['Heart Rate'] < 60,
        "high" in row['Blood Pressure'].lower() or "low" in row['Blood Pressure'].lower()
    ]
    return "Unhealthy" if any(unhealthy_conditions) else "Healthy"




# Apply functions to generate new columns
data[['Breakfast', 'Lunch', 'Evening Snack', 'Dinner']] = data.apply(lambda row: pd.Series(generate_meal_recommendations(row)), axis=1)
data['Nutritional Needs'] = data.apply(generate_nutritional_needs, axis=1)
data['Health Issues'] = data.apply(identify_health_issues, axis=1)
data['Health Status'] = data.apply(determine_health_status, axis=1)


# Save the updated dataset
output_file_path = 'Sleep_health_and_lifestyle_detailed_diet.csv'
data.to_csv(output_file_path, index=False)

print("Dataset with customized columns saved as", output_file_path)
