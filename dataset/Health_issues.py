import pandas as pd

# Load your dataset
file_path = 'Sleep_health_and_lifestyle_custom_diet.csv'
data = pd.read_csv(file_path)

# Drop the Diet Recommendations column if it exists
if 'Diet Recommendation' in data.columns:
    data.drop(columns=['Diet Recommendation'], inplace=True)

# Fill missing values for Sleep Disorder
data['Sleep Disorder'].fillna("None", inplace=True)

# Function to classify blood pressure
def classify_blood_pressure(blood_pressure):
    if pd.isna(blood_pressure):
        return "Unknown"
    
    try:
        systolic, diastolic = map(int, blood_pressure.split('/'))
        if systolic < 120 and diastolic < 80:
            return "Normal"
        elif 120 <= systolic <= 129 and diastolic < 80:
            return "Elevated"
        elif (130 <= systolic <= 139) or (80 <= diastolic <= 89):
            return "Hypertension Stage 1"
        elif systolic >= 140 or diastolic >= 90:
            return "Hypertension Stage 2"
        else:
            return "Unknown"
    except ValueError:
        return "Invalid"
    

# Function to determine recommended daily steps based on age
def recommended_daily_steps(age):
    if age < 18:
        return "10,000 to 15,000 steps"
    elif 18 <= age < 25:
        return "8,000 to 12,000 steps"
    elif 25 <= age < 45:
        return "7,000 to 10,000 steps"
    elif 45 <= age < 65:
        return "5,000 to 8,000 steps"
    elif age >= 65:
        return "5,000 to 6,000 steps"
    return "Unknown"


# Function to classify heart rate
def classify_heart_rate(hr):
    if hr < 60:
        return "Bradycardia"
    elif 60 <= hr <= 100:
        return "Normal"
    else:  # hr > 100
        return "Tachycardia"

# Function to identify health issues based on various parameters
def identify_health_issues(row):
    issues = []

    # Check BMI category
    if row['BMI Category'] in ["Underweight", "Overweight", "Obese"]:
        issues.append("BMI is not in the normal range.")
        if row['BMI Category'] == "Underweight":
         issues.append("Underweight: You seem underweight,Consider increasing caloric intake and nutritional density.")
        elif row['BMI Category'] == "Overweight":
         issues.append("Overweight: You seem Overweight!. Focus on weight reduction for a healthy lifestyle")
        elif row['BMI Category'] == "Obese":
         issues.append("Obese: You seem Obese,It is crucial to adopt a healthier lifestyle with dietary changes and increased physical activity.")
    elif row['BMI Category'] in ["Normal"]:
       issues.append("BMI is normal! Lets Continue to maintain a Healthy Body Mass Index")

    



     # Check Quality of Sleep based on age
    age = row['Age']
    sleep_quality = row['Quality of Sleep']
    
    if age < 4:  # Newborns (0–3 months)
        if sleep_quality < 14:
            issues.append("Inadequate sleep for newborns (14–17 hours recommended).")
    elif 4 <= age < 12:  # Babies (4 months–1 year)
        if sleep_quality < 12:
            issues.append("Inadequate sleep for babies (12–16 hours recommended).")
    elif 1 <= age < 3:  # Children (1–2 years)
        if sleep_quality < 11:
            issues.append("Inadequate sleep for children (11–14 hours recommended).")
    elif 3 <= age < 6:  # Children (3–5 years)
        if sleep_quality < 10:
            issues.append("Inadequate sleep for children (10–13 hours recommended, including naps).")
    elif 6 <= age < 13:  # Children (6–12 years)
        if sleep_quality < 9:
            issues.append("Inadequate sleep for children (9–12 hours recommended).")
    elif 13 <= age < 19:  # Teenagers (13–18 years)
        if sleep_quality < 8:
            issues.append("Inadequate sleep for teenagers (8–10 hours recommended).")
    elif 18 <= age < 26:  # Adults (18–25 years)
        if sleep_quality < 7:
            issues.append("Inadequate sleep for adults (7–9 hours recommended).")
    elif 26 <= age < 65:  # Adults (26–64 years)
        if sleep_quality < 7:
            issues.append("Inadequate sleep for adults (7–9 hours recommended).")
    elif age >= 65:  # Seniors (65 years and older)
        if sleep_quality < 7:
            issues.append("Inadequate sleep for seniors (7–8 hours recommended).")




    # Check Blood Pressure
     # Check Blood Pressure classification
    bp_status = classify_blood_pressure(row['Blood Pressure'])
    if bp_status in ["Hypertension Stage 1", "Hypertension Stage 2"]:
        issues.append("Blood pressure not within optimal range: " + bp_status)
    if bp_status in ["Normal"]:
        issues.append("Blood pressure is normal")
    if bp_status in ["Elevated"]:
        issues.append("Blood pressure is Elevated")
    
    

    # Check Stress Level
    if row['Stress Level'] > 7:
        issues.append("High stress level.")

    steps_goal = recommended_daily_steps(age)
    if row['Daily Steps'] < 5000:
        issues.append(f"Low daily activity level. Recommended daily steps for your age group: {steps_goal}.")


    # Check Sleep Disorder
    if row['Sleep Disorder'] != "None":
        issues.append("Presence of sleep disorder.")
        if row['Sleep Disorder']== "Insomnia":
            issues.append("Insomnia sleep disorder present")
        if row['Sleep Disorder']== "Sleep Apnea":
            issues.append("Sleep Apnea sleep disorder present")
    if row['Sleep Disorder']== "None":
            issues.append("Free from any sleep disorder")
        
    

    #check heart rate 
    heart_rate = row['Heart Rate']
    if heart_rate < 60:
        issues.append("Bradycardia: Heart rate is below normal (60 bpm).")
    elif heart_rate > 100:
        issues.append("Tachycardia: Heart rate is above normal (100 bpm).")
    elif 60<= heart_rate <=  100:
        issues.append("Normal Heart Rate")
        
    return issues

# Function to determine health status
def determine_health_status(row):
    unhealthy_conditions = [
        row['BMI Category'] in ["Underweight", "Overweight", "Obese"],
        row['Quality of Sleep'] < 5,
        row['Stress Level'] > 7,
        row['Daily Steps'] < 5000,
        row['Sleep Disorder'] != "None",
        row['Heart Rate'] > 100 or row['Heart Rate'] < 60,
        # "high" in row['Blood Pressure'].lower() or "low" in row['Blood Pressure'].lower()
    ]
    return "Unhealthy" if any(unhealthy_conditions) else "Healthy"

# Apply functions to generate new columns
data['Health Status'] = data.apply(determine_health_status, axis=1)
data['Health Issues'] = data.apply(identify_health_issues, axis=1)


# Save the updated dataset
output_file_path = 'health_issues.csv'
data.to_csv(output_file_path, index=False)

print("Dataset with health issues and health status saved as", output_file_path)
