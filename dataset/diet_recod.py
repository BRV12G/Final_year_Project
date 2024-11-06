import pandas as pd

# Load dataset
file_path = 'Sleep_health_and_lifestyle_custom_diet.csv'
data = pd.read_csv(file_path)

data['Sleep Disorder'].fillna("None", inplace=True)

if 'Diet Recommendation' in data.columns:
    data.drop(columns=['Diet Recommendation'], inplace=True)

# Meal recommendation configurations for different attributes
MEALS = {
    "breakfast": {
        "Underweight": {
            "veg": "Paratha with butter or ghee, paneer bhurji, banana shake.",
            "nonveg": "Eggs with toast and a banana shake."
        },
        "Normal": {
            "veg": "Idli or poha with vegetables, fresh fruit juice.",
            "nonveg": "Scrambled eggs with toast, and a fruit smoothie."
        },
        "Overweight": {
            "veg": "Oats or ragi porridge with nuts, and a bowl of fruits.",
            "nonveg": "Egg white omelette with vegetables and a bowl of fruit."
        },
        "Obese": {
            "veg": "Oats or ragi porridge with nuts, and a bowl of fruits.",
            "nonveg": "Egg white omelette with a fresh veggie smoothie."
        }
    },
    "lunch": {
        "high_activity": {
            "veg": "Roti, dal, paneer, vegetable sabzi, and salad.",
            "nonveg": "Roti, dal, grilled chicken, vegetable sabzi, and salad."
        },
        "low_activity": {
            "veg": "Light dal or sambar, vegetable curry, roti, and a small bowl of curd.",
            "nonveg": "Light dal, vegetable curry, roti, and curd."
        },
        "medium_activity": {
            "veg": "Roti or rice, mixed dal, vegetable curry, and a bowl of curd.",
            "nonveg": "Roti or rice, mixed dal, grilled fish, and curd."
        }
    },
    "evening_snack": {
        "high_stress_or_poor_sleep": {
            "veg": "Herbal tea with tulsi or chamomile, handful of mixed nuts.",
            "nonveg": "Herbal tea and boiled eggs or mixed nuts."
        },
        "normal": {
            "veg": "Fresh fruit or a smoothie, or some roasted chana or makhana.",
            "nonveg": "Fruit or smoothie with a boiled egg."
        }
    },
    "dinner": {
        "Sleep Apnea": {
            "veg": "Vegetable soup with moong dal khichdi, avoid spicy or heavy foods.",
            "nonveg": "Light soup with grilled fish, avoid spicy foods."
        },
        "Overweight": {
            "veg": "Stir-fried vegetables with a light dal or grilled paneer.",
            "nonveg": "Stir-fried vegetables with grilled chicken."
        },
        "Obese": {
            "veg": "Stir-fried vegetables with a light dal or grilled paneer.",
            "nonveg": "Stir-fried vegetables with grilled fish."
        },
        "default": {
            "veg": "Roti, light curry, and some salad or a bowl of soup.",
            "nonveg": "Roti, light chicken curry, salad, or soup."
        }
    }
}

# Function to generate meal recommendations
def generate_meal_recommendations(row):
    bmi = row.get('BMI Category', 'Normal')
    sleep_quality = row.get('Quality of Sleep', 5)
    stress_level = row.get('Stress Level', 5)
    physical_activity = row.get('Physical Activity Level', 30)
    sleep_disorder = row.get('Sleep Disorder', "None")
    diet_type = row.get('Diet Preference', 'veg').lower()  # assuming veg if missing

    # Breakfast recommendation
    breakfast = MEALS["breakfast"].get(bmi, MEALS["breakfast"]["Normal"]).get(diet_type, "Unknown breakfast")

    # Lunch recommendation based on physical activity
    if physical_activity > 50:
        lunch = MEALS["lunch"]["high_activity"].get(diet_type, "Unknown lunch")
    elif physical_activity < 30:
        lunch = MEALS["lunch"]["low_activity"].get(diet_type, "Unknown lunch")
    else:
        lunch = MEALS["lunch"]["medium_activity"].get(diet_type, "Unknown lunch")

    # Evening snack recommendation based on stress level and sleep quality
    if stress_level > 7 or sleep_quality < 5:
        evening_snack = MEALS["evening_snack"]["high_stress_or_poor_sleep"].get(diet_type, "Unknown snack")
    else:
        evening_snack = MEALS["evening_snack"]["normal"].get(diet_type, "Unknown snack")

    # Dinner recommendation based on sleep disorder and BMI category
    if sleep_disorder == "Sleep Apnea":
        dinner = MEALS["dinner"]["Sleep Apnea"].get(diet_type, "Unknown dinner")
    elif bmi in ["Overweight", "Obese"]:
        dinner = MEALS["dinner"]["Overweight"].get(diet_type, "Unknown dinner")
    else:
        dinner = MEALS["dinner"]["default"].get(diet_type, "Unknown dinner")

    return breakfast, lunch, evening_snack, dinner

# Apply the function and add columns to the dataset
data[['Breakfast', 'Lunch', 'Evening Snacks', 'Dinner']] = data.apply(lambda row: pd.Series(generate_meal_recommendations(row)), axis=1)

# Save updated dataset
output_file_path = 'diet_recommendations.csv'
data.to_csv(output_file_path, index=False)

print("Diet recommendations saved as", output_file_path)

