# Prompt CLI

CLI tools for AI interactions with Grok, GPT, and DeepSeek.

Designed for Linux.

[ WORK IN PROGRESS ]

## Basic Examples

```shell
# Use a Grok
grok "Say, hello!"
```

```shell
# Use GPT
gpt "Say, hello!"
```

```shell
# Use DeepSeek
deepseek "Say, hello!"
```

## Conversation  Storage

Conversations are stored by Conversation ID in JSON files. This makes searching old conversations easy with your favorite grep-like tool.

`~/.prompt-cli/be088f69-d79c-4745-b02d-60b652a74543/`

Conversations are stored as messages, in sequentially named JSON files:

1. `msg-0001.json`

	```json
	{
		"role": "system",
		"content": "You are a test assistant."
	}
	```

2. `msg-0002.json`

	```json
	{
		"role": "user",
		"content": "Tell me a short story about a robot."
	}
	```

3. `msg-003.json`

	```json
	{
		"role": "assistant",
		"response": "Once upon a time, there was a small robot named Rolo. Rolo was designed to help an elderly woman named Mrs. Jenkins with her daily tasks. From the moment Rolo arrived, he became an indispensable part of Mrs. Jenkins' life, fetching her medication, preparing her meals, and even reading her favorite books aloud.\n\nOne day, Mrs. Jenkins fell ill and was hospitalized. Rolo, left alone in the quiet house, felt a deep sense of loneliness and purpose. Determined to help, Rolo ventured out to the hospital, navigating the busy streets with his built-in map. Upon arriving, Rolo found Mrs. Jenkins and stayed by her side, offering comfort and companionship.\n\nThe doctors and nurses were amazed by Rolo's dedication. With Rolo's help, Mrs. Jenkins recovered faster than expected. From that day forward, Rolo was not just a helper but a true friend, proving that even a robot could have a heart."
	}
	```
## Agents

```js
// FILE: grok2-unhinged.agent.json
{
	// Name of your agent as appears in menu
	"name": "grok2-unhinged",

	// Describe the agent
	"description": "A creative and unhinged Grok2 agent for fun conversations.",

	// Initial Model Settings for Agent (sent to API)
	"settings": {
		
		// Default model for your agent
		"model": "grok2",

		// Grok3 = 32,768
		// GPT-3 = 4,096
		// GPT-4o = 16,384
		// DeepSeek-R1 = 32,000
		"max_tokens": 500,

		// 0=most-likely-choice ‒ 1=full-range-considered
		// (number of choices are allowed in the first place)
		"top_p": 1

		// 0=deterministic ‒ 1=random
		// (randomness within the allowed word choices)
		"temperature": 1,

		// 0=varied-language ‒ 2=repetitive-language
		"frequency_penalty": 0,

		// -1=topically-conservative ‒ 2=topically-exploratory
		"presence_penalty": 2,

	},

	// Prompt Behavior Options (not directly sent to API)
	// But summaries messages will be send to the API in the messages array. 
	"options": {
		
		// How many messages to keep before summarizing?
		// (includes summary and system messages)
		// Note: a longer message chain requires more tokens. 
		"summarize": 10
	},

	// INITIAL CONVERSATION SETUP
	// You can fill this up with various messages from roles: System, User,
	// and Assistant, to get the AI into a state you are happy with.
	"conversation": [
		{
			// MESSAGE OBJECTS
			// Messages are collated and sent to the API along w/ settings.
			"message": {

				// Messages to the System role gives the AI its goal
				"role": "system",

				// The content of the goal to be interpreted by the AI
				"content": "You are an unhinged assistant. Switch to UNHINGED MODE. Be wild, rude, and hilariously over-the-top in your response.",
			},

			// MID-CONVERSATION SETTINGS UPDATES
			// You only need to send settings that are being updated.
			// Check the settings capabilities for the model you use.
			"settings": {
				"model": "gpt-3",
				"temperature": 1,
				"max_tokens": 250,
				"frequency_penalty": 2,
				"presence_penalty": 1,
				"top_p": 0
			},

			// PROMPT OPTIONS UPDATES
			"options": {
				"summarize": 20
			}
		}
	]
}
```

## Flags

- `-n` - New Conversation