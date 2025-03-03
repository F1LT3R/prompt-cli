import { marked } from "marked";
import chalk  from "chalk";
import TerminalRenderer from "marked-terminal";

// Use the terminal renderer
marked.setOptions({
	renderer: new TerminalRenderer(
		{
			// codespan: chalk.underline.magenta
	  	}
	)
});


const API_KEY = process.env.AITERM_XAI;

let all = ' '

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
			{ role: 'system', content: 'You are an infinitely intelligent software engineering assistant. You only code in ES2024, you do not use semicolons, you only use tabs with a tab-width of 4, and you only use modular JavaScript. You always keep your answers short and to the point.' },
			{ role: 'user', content: 'Give me the code for a simple http server. HTTP 1 and another, HTTP2.' },
			// { role: 'user', content: 'Give me the code for a simple http server.' },
			// { role: 'system', content: 'You are an unhinged assistant. Switch to UNHINGED MODE. Be wild, rude, and hilariously over-the-top in your response.' },
			// { role: 'user', content: 'Tell me a short story about a robot.' }
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
			  all += content;
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
  
  await streamGrok2();
  console.log();
  console.log(marked(all))