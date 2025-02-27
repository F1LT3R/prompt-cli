import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AITERM_OPENAI, // Store this in an environment variable
});

async function listAvailableModels() {
  try {
    const models = await openai.models.list();
    console.log("Available Models:");
    models.data.forEach(model => {
      console.log(`- ${model.id}`);
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

/*
gpt-4o
gpt-4o-mini
o1
o1-mini
o3-mini

dall-e-3
dall-e-2
*/

async function chatWithGPT(model, userMessage, callback) {
  try {
    const stream = await openai.chat.completions.create({
      model: model, // e.g., "gpt-4-turbo"
      messages: [{ role: "user", content: userMessage }],
      stream: true, // ✅ ENABLE STREAMING
    });

    let fullResponse = "";

    // Process stream data as it comes in
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      process.stdout.write(text); // Print in real-time
      fullResponse += text;
    }

    console.log("\n"); // Move to a new line after response
    if (callback) callback(fullResponse); // 🔥 Call the callback with the full response

  } catch (error) {
    console.error("Error:", error);
  }
}

// listAvailableModels();

// const question = "Write intro paragraph to story about mysterious ice cave."
const question = "simple node http server"

// Example usage with a callback function
chatWithGPT("gpt-4-turbo", question, (response) => {
  console.log("✅ Callback fired! Full response received:");
  console.log(response);
});

