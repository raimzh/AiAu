import { readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Playfair Display для картинок-превью и иконок: в ImageResponse шрифт нужно передать файлом.
 * Если файла нет — возвращаем undefined, и картинка просто рендерится дефолтным шрифтом,
 * а не роняет сборку.
 */
export async function playfair(): Promise<ArrayBuffer | undefined> {
  try {
    const buf = await readFile(path.join(process.cwd(), 'app/_fonts/PlayfairDisplay-Bold.ttf'))
    return Uint8Array.from(buf).buffer
  } catch {
    return undefined
  }
}
