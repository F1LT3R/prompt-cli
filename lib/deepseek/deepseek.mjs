import https from 'https';

// Replace with your DeepSeek API endpoint and API key
const apiUrl = 'https://api.deepseek.com/chat/completions'; // Example endpoint
const apiKey = process.env.AITERM_DEEPSEEK;

// Define the request body
const requestBody = JSON.stringify({
    prompt: "Intro paragraph for story about an ice cave.",
    max_tokens: 100,
	model: "deepseek-chat",
	messages: [
		{
			"role": "system",
			"content": "You are a helpful system."
		},
		{
			"role": "user",
			"content": "Intro paragraph for story about ice cave."
		}
	],
	stream: true
});

// Define the request options
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    }
};

// Make the request
const req = https.request(apiUrl, options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

	let buffer = '';

	res.on('data', (chunk) => {
		buffer += String(chunk); // Append the new chunk to the buffer

		// Split buffer by newlines to process each line separately
		const lines = buffer.split('\n');
		buffer = lines.pop(); // Keep the last (possibly incomplete) line in the buffer
	  
		for (const line of lines) {
		  if (line.trim() === '') continue; // Skip empty lines
		  const cleanedLine = line.replace(/^data:\s*/, ''); // Remove "data: " prefix
		  if (cleanedLine === '[DONE]') continue;
		  if (!cleanedLine) continue; // Skip if there's nothing left after cleaning
	  
		  try {
			const jsonData = JSON.parse(cleanedLine);
			// console.log(jsonData);

			// console.log(Reflect.has(jsonData.choices[0], 'delta'))
			process.stdout.write(jsonData.choices[0].delta.content)
		  } catch (e) {
			console.error(e)
			console.error('Failed to parse line:', cleanedLine, 'Error:', e.message);
		  }
		}
	  });

    // Handle the end of the stream
    res.on('end', () => {
        console.log('Stream ended.');
    });
});

// Handle errors
req.on('error', (error) => {
    console.error('Request error:', error);
});

// Send the request body
req.write(requestBody);
req.end();