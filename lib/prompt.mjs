#!/usr/bin/env node
import fs from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url';

import prompts from 'prompts';

// Banner
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const banner = String(fs.readFileSync(`${__dirname}/banner.txt`))
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version
console.log(`${banner} ${version}`)


const cwd = process.cwd()

// for (let arg of process.argv.slice(2)) {
// 	console.log(arg)
// }

// const selectSource = {
// 	type: 'multiselect',
// 	name: 'value',
// 	message: 'Select',
// 	choices: [
// 	  { title: 'Grok', value: 'xai' },
// 	  { title: 'DeepSeek', value: 'deepseek'},
// 	  { title: 'Chat-GPT', value: 'openai'}
// 	],
// 	hint: '- Space to select. Return to submit'
//   }

// const response = await prompts(selectSource);
// console.log(response)

