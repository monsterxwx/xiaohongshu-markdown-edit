import { marked } from 'marked';

export function getWechatRenderer() {
  const renderer = new marked.Renderer();

  // 1. 标题渲染 (H1 - H4 使用不同的内联样式)
  renderer.heading = function (token: any) {
    const text = this.parser.parseInline(token.tokens);
    const depth = token.depth;
    const rawText = token.text; // 用于正则匹配的纯文本

    if (depth === 1) {
      return `
        <section style="margin-bottom: 30px; text-align: center;">
            <h1 style="font-size: 24px; color: #1a1a1a; font-weight: bold; line-height: 1.4; margin-bottom: 15px;">
                ${text}
            </h1>
            <p style="font-size: 14px; color: #999; margin: 0;">原创 · 你的职场AI导师</p>
        </section>
      `;
    }
    
    if (depth === 2) {
      // 匹配是否以数字开头，如 "01 xxx"
      const numMatch = rawText.match(/^([\d]+)[ \.]*(.*)$/);
      if (numMatch) {
        const num = numMatch[1].padStart(2, '0');
        // 将数字部分剥除后，再对剩下的 markdown text 渲染
        // 这里简化处理，直接用正则替换原始的数字前缀
        const restText = text.replace(/^([\d]+)[ \.]*/, '');
        return `
          <section style="display: flex; align-items: center; margin-top: 40px; margin-bottom: 15px;">
              <span style="background-color: #2b5cff; color: #fff; font-size: 14px; font-weight: bold; padding: 2px 8px; border-radius: 4px; margin-right: 10px;">${num}</span>
              <strong style="font-size: 18px; color: #2b5cff;">${restText}</strong>
          </section>
        `;
      }
      return `
        <section style="display: flex; align-items: center; margin-top: 40px; margin-bottom: 15px;">
            <strong style="font-size: 18px; color: #2b5cff;">${text}</strong>
        </section>
      `;
    }

    if (depth === 3) {
      // 匹配第一个词作为 Tag，后面的作为描述，例如 "💼 适用场景 重新打磨简历"
      const parts = rawText.split(' ');
      let badgeHtml = parts[0]; 
      let restHtml = text.replace(badgeHtml, '').trim();
      
      if (!restHtml) {
          badgeHtml = 'ℹ️ 提示';
          restHtml = text;
      }
      return `
        <p style="font-size: 13px; color: #888; margin: 0 0 10px 0; display: flex; align-items: center;">
            <span style="display: inline-block; background: #eef2ff; color: #5c7cfa; padding: 2px 6px; border-radius: 4px; margin-right: 8px;">${badgeHtml}</span>
            ${restHtml}
        </p>
      `;
    }

    if (depth === 4) {
      return `
        <section style="background-color: #fff8e6; border: 1px dashed #ffc107; padding: 12px 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 0; font-size: 14px; color: #d97706;"><strong>${text}</strong></p>
        </section>
      `;
    }

    return `<h${depth} style="margin-top:20px; margin-bottom:10px; font-weight:bold; color:#333;">${text}</h${depth}>`;
  };

  // 2. 引用块渲染 (导语区域)
  renderer.blockquote = function (token: any) {
    const body = this.parser.parse(token.tokens);
    const formattedQuote = body.replace(/<p(.*?)>/g, '<p style="margin: 0 0 10px 0; font-size: 15px; color: #555;">');
    return `
      <section style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #2b5cff;">
          ${formattedQuote}
      </section>
    `;
  };

  // 3. 段落渲染
  renderer.paragraph = function (token: any) {
    const text = this.parser.parseInline(token.tokens);
    return `<p style="font-size: 15px; color: #333; margin-bottom: 15px; line-height: 1.8; letter-spacing: 0.5px;">${text}</p>`;
  };

  // 4. 代码块渲染
  renderer.code = function (token: any) {
    const text = token.text;
    const formattedCode = text.replace(/\n/g, '<br>');
    return `
      <section style="background-color: #252526; color: #d4d4d4; padding: 15px 20px; border-radius: 8px; margin-bottom: 15px; font-size: 14px; line-height: 1.8;">
          <span style="color: #6a9955; font-size: 12px; margin-bottom: 8px; display: block;">// 💬 AI 提示词（可以直接复制）：</span>
          <span style="color: #ce9178;">${formattedCode}</span>
      </section>
    `;
  };

  // 5. 加粗/强调渲染
  renderer.strong = function (token: any) {
    const text = this.parser.parseInline(token.tokens);
    return `<strong style="color: #2b5cff; font-weight: bold;">${text}</strong>`;
  };

  return renderer;
}

export function renderWechatHtml(markdown: string): string {
  if (!markdown || !markdown.trim()) {
    return '';
  }

  const renderer = getWechatRenderer();
  
  // Base wrapper
  const wrapperStart = `<section style="max-width: 650px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; color: #333; line-height: 1.7; letter-spacing: 0.5px; padding: 15px; box-sizing: border-box;">`;
  const wrapperEnd = `</section>`;
  
  // We use marked.parse with the configured options
  const innerHtml = marked.parse(markdown, { renderer, breaks: true, gfm: true }) as string;
  
  return wrapperStart + innerHtml + wrapperEnd;
}
