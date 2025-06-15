export type BlockCategory =
  | { type: 'text'; content: string }
  | { type: 'heading'; level: 1 | 2 | 3; content: string }
  | { type: 'bulleted-list'; items: string[] }
//   | { type: 'task-list'; items: { text: string; done: boolean }[] }
//   | { type: 'numbered-list'; items: string[] }
//   | { type: 'citation'; content: string }
//   | { type: 'file'; name: string; url: string }
//   | { type: 'link-preview'; url: string }
//   | { type: 'table'; rows: string[][] }
//   | { type: 'code'; language: string; code: string }
//   | { type: 'fold-out'; title: string; content: Block[] }
//   | { type: 'image'; src: string; alt?: string }
//   | { type: 'video'; src: string }
//   | { type: 'audio'; src: string }
//   | { type: 'color'; hex: string }
//   | { type: 'category'; name: string }
//   | { type: 'columns'; columns: Block[][] }