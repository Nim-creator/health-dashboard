import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getWellnessAdvice = async (healthData) => {
  const prompt = `As a professional health advisor, analyze these health metrics and provide specific, actionable wellness advice:

  Patient Health Metrics:
  - Heart Rate: ${healthData.heartRate} bpm (Normal: 60-100)
  - Blood Pressure: ${healthData.bloodPressure} mmHg (Normal: 120/80)
  - Sleep Duration: ${healthData.sleepHours} hours (Recommended: 7-9)
  - Oxygen Level: ${healthData.oxygenLevel}% (Normal: 95-100%)
  - Weight: ${healthData.weight} kg
  - Mood: ${healthData.mood}

  Provide:
  1. Brief analysis of each metric
  2. 3-5 specific recommendations
  3. Suggested lifestyle adjustments
  4. When to consult a doctor

  Use a compassionate, professional tone.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`, // ✅ FIXED with backticks
        },
        timeout: 10000,
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    throw new Error(getErrorMessage(error));
  }
};

function getErrorMessage(error) {
  if (!error.response) return 'Network error - please check your connection';

  switch (error.response.status) {
    case 401:
      return 'Invalid API key - please check your configuration';
    case 429:
      return 'API limit exceeded - please try again later';
    case 500:
      return 'OpenAI server error - please try again';
    default:
      return 'Unable to generate advice at this time';
  }
}

