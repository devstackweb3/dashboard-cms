import { BlockCategory } from '@/app/types/BlockCategory'
import { EditableHeading } from './EditableHeading';

// Fonction pour tester de quel type de titre on a besoin
// function Heading({ level, content }: { level: 1 | 2 | 3; content: string }) {
//   if (level === 1) return <h1 className="text-3xl font-bold">{content}</h1>
//   if (level === 2) return <h2 className="text-2xl font-semibold">{content}</h2>
//   return <h3 className="text-xl font-medium">{content}</h3>
// }

export function BlockRenderer({ block, onChange }: {
    block: BlockCategory
    onChange: (updated: BlockCategory) => void
  }) {
  switch (block.type) {
    case 'heading':
      return <EditableHeading block={block} onChange={onChange} />

    case 'bulleted-list':
      return (
        <ul className="list-disc pl-5">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    // case 'task-list':
    //   return <ul>{block.items.map((item, i) => <li key={i}><input type="checkbox" checked={item.done} readOnly /> {item.text}</li>)}</ul>
    // case 'numbered-list':
    //   return <ol className="list-decimal pl-5">{block.items.map((i, k) => <li key={k}>{i}</li>)}</ol>
    // case 'citation':
    //   return <blockquote className="border-l-4 pl-4 italic text-gray-500">{block.content}</blockquote>
    // case 'file':
    //   return <a href={block.url} className="text-blue-600 underline">{block.name}</a>
    // case 'link-preview':
    //   return <a href={block.url} className="text-blue-500 italic">{block.url}</a>
    // case 'table':
    //   return (
    //     <table className="table-auto border">
    //       <tbody>
    //         {block.rows.map((row, i) => (
    //           <tr key={i}>
    //             {row.map((cell, j) => <td key={j} className="border px-2 py-1">{cell}</td>)}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )
    // case 'code':
    //   return <pre className="bg-gray-100 p-2 font-mono text-sm"><code>{block.code}</code></pre>
    // case 'fold-out':
    //   return (
    //     <details className="my-2">
    //       <summary className="cursor-pointer font-semibold">{block.title}</summary>
    //       <div className="ml-4">
    //         {block.content.map((b, i) => <BlockRenderer key={i} block={b} />)}
    //       </div>
    //     </details>
    //   )
    // case 'image':
    //   return <img src={block.src} alt={block.alt || ''} className="my-2 max-w-full" />
    // case 'video':
    //   return <video controls src={block.src} className="my-2 max-w-full" />
    // case 'audio':
    //   return <audio controls src={block.src} className="my-2 w-full" />
    // case 'color':
    //   return <div className="w-8 h-8 rounded" style={{ backgroundColor: block.hex }}></div>
    // case 'category':
    //   return <span className="bg-blue-100 px-2 py-1 rounded text-sm text-blue-800">{block.name}</span>
    // case 'columns':
    //   return (
    //     <div className="flex gap-4">
    //       {block.columns.map((col, i) => (
    //         <div key={i} className="flex-1">
    //           {col.map((b, j) => <BlockRenderer key={j} block={b} />)}
    //         </div>
    //       ))}
    //     </div>
    //   )
    default:
      return <div>Bloc non pris en charge</div>
  }
}
