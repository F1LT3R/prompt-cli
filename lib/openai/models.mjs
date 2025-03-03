import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AITERM_OPENAI, // Store this in an environment variable
});

"0gG"

async function listModelsWithDetails() {
  try {
    const models = await openai.models.list();
    console.log("Available Models and Details:\n");

    for (const model of models.data) {
		const modelDetails = await openai.models.retrieve(model.id);
		console.log(`Model: ${modelDetails.id}`);
		console.log(`Owned By: ${modelDetails.owned_by}`);
		console.log(`Created At: ${new Date(modelDetails.created * 1000).toLocaleString()}`);
		console.log(JSON.stringify(modelDetails, null, 2));
      console.log("--------------------------------------");
    }
  } catch (error) {
    console.error("Error fetching model details:", error);
  }
}

// Run the function
listModelsWithDetails();
