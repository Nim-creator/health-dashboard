import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_OPENAI_KEY;

export const getWellnessAdvice = async (healthData) => {
  const prompt = `As a health advisor, analyze these vitals and provide personalized wellness advice:
  - Heart Rate: ${healthData.heartRate} bpm
  - Blood Pressure: ${healthData.bloodPressure}
  - Sleep: ${healthData.sleepHours} hours
  - Oxygen Level: ${healthData.oxygenLevel}%
  - Weight: ${healthData.weight} kg
  - Mood: ${healthData.mood}
  
  Provide specific recommendations for improvement in a friendly, professional tone. 
  Include actionable steps and explain why they would help.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}` // ✅ FIXED: Wrapped in backticks
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return "Unable to generate advice at this time. Please try again later.";
  }
};

