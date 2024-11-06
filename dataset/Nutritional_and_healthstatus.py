import pandas as pd

# Load your dataset
file_path = 'Sleep_health_and_lifestyle_custom_diet.csv'
data = pd.read_csv(file_path)

# Drop the Diet Recommendations column if it exists
if 'Diet Recommendation' in data.columns:
    data.drop(columns=['Diet Recommendation'], inplace=True)

# Fill missing values for Sleep Disorder
data['Sleep Disorder'].fillna("None", inplace=True)

# Function to generate nutritional needs recommendations
def generate_nutritional_needs(row):
    # Extract parameters
    bmi = row['BMI Category']
    gender = row['Gender']
    age = row['Age']
    occupation = row['Occupation']
    sleep_duration = row['Sleep Duration']
    sleep_quality = row['Quality of Sleep']
    physical_activity = row['Physical Activity Level']
    stress_level = row['Stress Level']
    blood_pressure = row['Blood Pressure']
    heart_rate = row['Heart Rate']
    daily_steps = row['Daily Steps']
    
    recommendations = []

    # Nutritional needs based on BMI
    if bmi == "Underweight":
        recommendations.append("Focus on calorie-dense foods with balanced proteins, fats, and carbohydrates.")
    elif bmi == "Normal":
        recommendations.append("Maintain a balanced intake of protein, complex carbohydrates, and fiber.")
    else:
        recommendations.append("Follow a low-calorie, high-fiber diet with lean proteins.")

    # Additional recommendations based on other parameters
    if gender == "Female" and age < 50:
        recommendations.append("Ensure adequate iron intake from leafy greens and legumes.")
    elif gender == "Male" and age > 50:
        recommendations.append("Increase fiber intake to support heart health.")

    if sleep_duration < 7:
        recommendations.append("Aim for at least 7 hours of sleep for better health.")
    
    if sleep_quality < 5:
        recommendations.append("Improve sleep hygiene for better quality of sleep.")

    if physical_activity < 30:
        recommendations.append("Increase physical activity to at least 30 minutes a day.")

    if stress_level > 7:
        recommendations.append("Consider relaxation techniques to manage stress levels.")
    
    if heart_rate < 60 or heart_rate > 100:
        recommendations.append("Consult a healthcare provider regarding your heart rate.")

    if daily_steps < 5000:
        recommendations.append("Aim for at least 5000 steps daily to improve fitness.")

    return " | ".join(recommendations) if recommendations else "No specific nutritional needs identified."

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
data['Health Status'] = data.apply(determine_health_status, axis=1)
data['Nutritional Needs'] = data.apply(generate_nutritional_needs, axis=1)


# Save the updated dataset
output_file_path = 'nutritional_needs_with_status.csv'
data.to_csv(output_file_path, index=False)

print("Dataset with nutritional needs and health status saved as", output_file_path)
