import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

// Use the terminal renderer
marked.setOptions({
    renderer: new TerminalRenderer()
});

const markdown = `
# Heading 1
## Heading 2
- List item 1
- List item 2
\`inline code\`
\`\`\`js
console.log("Hello, World!");
\`\`\`
`;

console.log(marked(markdown));
