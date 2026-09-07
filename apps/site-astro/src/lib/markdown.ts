import {
  createMarkdownProcessor,
  type RehypePlugin,
} from "@astrojs/markdown-remark";

type ElementNode = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: HtmlNode[];
};

type HtmlNode = ElementNode | { type: string; children?: HtmlNode[] };

const improveLinksAndImages: RehypePlugin = () => (tree) => {
  const visit = (node: HtmlNode) => {
    if (node.type === "element") {
      const element = node as ElementNode;
      const properties = (element.properties ??= {});

      if (element.tagName === "a") {
        const href = properties.href;
        if (typeof href === "string" && /^https?:\/\//.test(href)) {
          // 外部リンクを別タブで開き、リンク先から元ページを操作できないようにする。
          properties.target = "_blank";
          properties.rel = ["noopener", "noreferrer"];
        }
      }

      if (element.tagName === "img") {
        // loading="lazy" で、画面に近づくまで画像の読み込みを遅らせる。
        properties.loading = "lazy";
        // decoding="async" で、画像のデコードがページ描画を妨げないようにする。
        properties.decoding = "async";
      }
    }

    node.children?.forEach(visit);
  };

  visit(tree as HtmlNode);
};

const processor = await createMarkdownProcessor({
  syntaxHighlight: "shiki",
  shikiConfig: {
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
    wrap: true,
  },
  rehypePlugins: [improveLinksAndImages],
});

export const renderMarkdown = async (source: string) => {
  const result = await processor.render(source);
  return result.code;
};

export const createPostDescription = (source: string) => {
  // コードと画像を除外し、リンクは表示名だけ残して Markdown/HTML 記法と余分な空白を取り除く。
  const plainText = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~\-]+/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > 120 ? `${plainText.slice(0, 120)}…` : plainText;
};
