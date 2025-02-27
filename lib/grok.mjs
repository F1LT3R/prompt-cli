const API_KEY = process.env.AITERM_XAI;

async function streamGrok2() {
	try {
	  const response = await fetch('https://api.x.ai/v1/chat/completions', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${API_KEY}` // Replace with your key
		},
		body: JSON.stringify({
		  messages: [
			{ role: 'system', content: 'You are a test assistant.' },
			{ role: 'user', content: 'Tell me a short story about a robot.' }
		  ],
		  model: 'grok-2-latest',
		  stream: true, // Enable streaming
		  temperature: 0
		})
	  });
  
	  if (!response.ok) throw new Error(await response.text());
  
	  const reader = response.body.getReader();
	  const decoder = new TextDecoder();
  
	  while (true) {
		const { done, value } = await reader.read();
		if (done) {
		  console.log('\nStream completed.');
		  break;
		}
  
		const chunk = decoder.decode(value);
		const lines = chunk.split('\n').filter(line => line.trim());
		for (const line of lines) {
		  if (line.startsWith('data: ')) {
			const data = line.slice(6);
			if (data === '[DONE]') {
			  console.log('\nStream ended.');
			  return;
			}
			try {
			  const parsed = JSON.parse(data);
			  const content = parsed.choices[0].delta.content || '';
			  process.stdout.write(content); // Stream to console
			} catch (e) {
			  // Skip malformed chunks
			}
		  }
		}
	  }
	} catch (error) {
	  console.error('Error:', error.message);
	}
  }
  
  streamGrok2();