import { BlockCategory } from "../types/BlockCategory"

export const blockTemplates = {
    heading1: (): BlockCategory => ({ type: 'heading', level: 1, content: 'Title 1' }),
    heading2: (): BlockCategory => ({ type: 'heading', level: 2, content: 'Title 2' }),
    heading3: (): BlockCategory => ({ type: 'heading', level: 3, content: 'Title 3' }),
    // bulletedList: (): BlockCategory => ({ type: 'bulleted-list', items: ['Item 1'] }),
    // taskList: (): BlockCategory => ({ type: 'task-list', items: [{ text: 'Task 1', done: false }] }),
    // numberedList: (): BlockCategory => ({ type: 'numbered-list', items: ['Step 1'] }),
    // citation: (): BlockCategory => ({ type: 'citation', content: 'Citation...' }),
    // file: (): BlockCategory => ({ type: 'file', name: 'Document.pdf', url: '/files/doc.pdf' }),
    // linkPreview: (): BlockCategory => ({ type: 'link-preview', url: 'https://example.com' }),
    // table: (): BlockCategory => ({ type: 'table', rows: [['A1', 'B1'], ['A2', 'B2']] }),
    // code: (): BlockCategory => ({ type: 'code', language: 'javascript', code: '// code' }),
    // foldOut: (): BlockCategory => ({ type: 'fold-out', title: 'Fold-Out Title', content: [] }),
    // image: (): BlockCategory => ({ type: 'image', src: '/images/example.jpg', alt: 'Example image' }),
    // video: (): BlockCategory => ({ type: 'video', src: '/videos/example.mp4' }),
    // audio: (): BlockCategory => ({ type: 'audio', src: '/audio/example.mp3' }),
    // color: (): BlockCategory => ({ type: 'color', hex: '#FF0000' }),
    // category: (name: string): BlockCategory => ({ type: 'category', name }),
    // columns2: (): BlockCategory => ({ type: 'columns', columns: [[], []] }),
    // columns3: (): BlockCategory => ({ type: 'columns', columns: [[], [], []] }),
    // columns4: (): BlockCategory => ({ type: 'columns', columns: [[], [], [], []] }),
    // foldOut1: (): BlockCategory => ({ type: 'fold-out', title: 'Title 1 Fold-Out', content: [] }),
    // foldOut2: (): BlockCategory => ({ type: 'fold-out', title: 'Title 2 Fold-Out', content: [] }),
    // foldOut3: (): BlockCategory => ({ type: 'fold-out', title: 'Title 3 Fold-Out', content: [] })
}