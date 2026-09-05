import { visit } from "unist-util-visit";
import sizeOf from 'image-size';
import https from 'https';

function rehypeImageSize() {
  return async (tree) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, "element", (element) => {
      if (typeof window === 'undefined' && element.tagName === 'img') {
        promises.push(async () => {
          const { width, height } = await detectSizeFromURL(element.properties.src)
          element.properties.width = width
          element.properties.height = height
        });
      }
    });
    await Promise.allSettled(promises.map((t) => t()));
  };
}

const detectSizeFromURL = (url: string): Promise<{ width: number; height: number; }> => {
  if (typeof window === 'undefined') {
    return new Promise((resolve) => {
      https.get(url, function (response) {
        const chunks = []
        response.on('data', function (chunk) {
          chunks.push(chunk)
        }).on('end', function() {
          const buffer = Buffer.concat(chunks)
          try {
            const { width, height } = sizeOf(buffer)
            resolve({ width, height })
          } catch(e) {
            console.log('url is invalid1!!!!!!!!!!!', url)
            throw e
          }
        })
      })
    })
  }
}

export default rehypeImageSize;
