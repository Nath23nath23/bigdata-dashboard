const API_KEY = "AIzaSyBdh-lmvlwBl9q28jWzfixY1gaanAc3D5c";

export async function generateInsight(data) {

  try {

    const simplifiedData =
      data.slice(0, 5).map(item => ({
        country: item.entity,
        date: item.day,
        deaths: item.new_deaths_per_1m
      }));

    const prompt = `
    Analyze this COVID dataset and provide:

    1. Trend summary
    2. Highest death observation
    3. Public health insight

    Dataset:
    ${JSON.stringify(simplifiedData)}
    `;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",

          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const result = await response.json();

    console.log(result);

    return result.choices[0].message.content;

  } catch (error) {

    console.log(error);

    return "AI failed to load.";
  }
}