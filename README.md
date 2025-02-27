# Prompt CLI

CLI tools for AI interactions with Grok, GPT, and DeepSeek.

Designed for Linux.

[ WORK IN PROGRESS ]

## Basic Examples

```shell
# Prompt all default text based AI models.
prompt "Intro paragraph for story about an ice cave."
```

When prompting, the last session id is saved and new conversations are continued by default.

```shell
# Start a new conversation
prompt -n "Provide 2nd paragraph to story about an ice cave."
```

## Using Models Directly

```shell
# Use a Grok 2
grok-2 "Say, hello!"
```

```shell
# Use GPT-4o
gpt-4o "Say, hello!"
```

```shell
# Use DeepSeek-R1
deepseek-r1 "Say, hello!"
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


## Flags

- `-n` - New Conversation