import { marked } from 'marked';

export type WechatTheme = 'tech' | 'minimal' | 'emotion' | 'indigo' | 'geek';

interface ThemeConfig {
  wrapperStyle: string;
  h1: (text: string) => string;
  h2: (text: string, rawText: string) => string;
  h3: (text: string, rawText: string) => string;
  h4: (text: string) => string;
  blockquote: (html: string) => string;
  p: (text: string) => string;
  code: (text: string) => string;
  codespan?: (text: string) => string;
  strong: (text: string) => string;
  table?: (header: string, body: string) => string;
  tablecell?: (content: string, isHeader: boolean, align: string | null) => string;
}

const themes: Record<WechatTheme, ThemeConfig> = {
  tech: {
    wrapperStyle: `max-width: 650px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; color: #333; line-height: 1.7; letter-spacing: 0.5px; padding: 15px; box-sizing: border-box;`,
    h1: (text) => `
        <section style="margin-bottom: 30px; text-align: center;">
            <h1 style="font-size: 24px; color: #1a1a1a; font-weight: bold; line-height: 1.4; margin-bottom: 15px;">${text}</h1>
            <p style="font-size: 14px; color: #999; margin: 0;">科技前沿 · 效率利器</p>
        </section>`,
    h2: (text, rawText) => {
      const numMatch = rawText.match(/^([\d]+)[ \.]*(.*)$/);
      if (numMatch) {
        const num = numMatch[1].padStart(2, '0');
        const restText = text.replace(/^([\d]+)[ \.]*/, '');
        return `
          <section style="display: flex; align-items: center; margin-top: 40px; margin-bottom: 15px;">
              <span style="background-color: #2b5cff; color: #fff; font-size: 14px; font-weight: bold; padding: 2px 8px; border-radius: 4px; margin-right: 10px;">${num}</span>
              <strong style="font-size: 18px; color: #2b5cff;">${restText}</strong>
          </section>`;
      }
      return `<section style="display: flex; align-items: center; margin-top: 40px; margin-bottom: 15px;"><strong style="font-size: 18px; color: #2b5cff;">${text}</strong></section>`;
    },
    h3: (text, rawText) => {
      const parts = rawText.split(' ');
      let badgeHtml = parts[0]; 
      let restHtml = text.replace(badgeHtml, '').trim();
      if (!restHtml) { badgeHtml = '💡'; restHtml = text; }
      return `<p style="font-size: 14px; color: #666; margin: 0 0 12px 0; display: flex; align-items: center;"><span style="display: inline-block; background: #eef2ff; color: #5c7cfa; padding: 2px 6px; border-radius: 4px; margin-right: 8px;">${badgeHtml}</span> ${restHtml}</p>`;
    },
    h4: (text) => `
        <section style="background-color: #fff8e6; border: 1px dashed #ffc107; padding: 12px 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 0; font-size: 14px; color: #d97706;"><strong>${text}</strong></p>
        </section>`,
    blockquote: (html) => `
      <section style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #2b5cff;">
          ${html.replace(/<p(.*?)>/g, '<p style="margin: 0 0 10px 0; font-size: 15px; color: #555;">')}
      </section>`,
    p: (text) => `<p style="font-size: 15px; color: #333; margin-bottom: 15px; line-height: 1.8;">${text}</p>`,
    code: (text) => `
      <section style="background-color: #252526; border-radius: 8px; margin: 20px 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #1E1E1E; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #ce9178; font-size: 14px; font-family: ui-monospace, Consolas, monospace; overflow-x: auto; line-height: 1.8;">
          <span style="color: #6a9955; font-size: 12px; margin-bottom: 8px; display: block;">// 💬 Code / Prompt：</span>
          ${text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
        </div>
      </section>`,
    strong: (text) => `<strong style="color: #2b5cff; font-weight: bold;">${text}</strong>`
  },

  minimal: {
    wrapperStyle: `max-width: 600px; margin: 0 auto; font-family: -apple-system, system-ui, 'Helvetica Neue', sans-serif; color: #111; line-height: 1.6; letter-spacing: -0.2px; padding: 20px; box-sizing: border-box; background: #fff;`,
    h1: (text) => `
        <h1 style="font-size: 32px; color: #000; font-weight: 800; line-height: 1.2; margin: 40px 0 20px 0; letter-spacing: -1px;">${text}</h1>`,
    h2: (text, rawText) => {
      const display = rawText.match(/^([\d]+)[ \.]*(.*)$/) ? text.replace(/^([\d]+)[ \.]*/, '$1. ') : text;
      return `<h2 style="font-size: 20px; color: #000; font-weight: 700; margin: 48px 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #000;">${display}</h2>`;
    },
    h3: (text) => `<h3 style="font-size: 14px; color: #86868b; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin: 32px 0 12px 0;">${text}</h3>`,
    h4: (text) => `
        <section style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; background: #fafbfc; margin: 24px 0;">
            <p style="margin: 0; font-size: 15px; color: #111; font-weight: 500;">${text}</p>
        </section>`,
    blockquote: (html) => `
      <section style="margin: 24px 0; border-left: 3px solid #000; padding-left: 16px;">
          ${html.replace(/<p(.*?)>/g, '<p style="margin: 0 0 12px 0; font-size: 17px; color: #555; font-style: italic;">')}
      </section>`,
    p: (text) => `<p style="font-size: 16px; color: #333; margin-bottom: 20px; line-height: 1.7;">${text}</p>`,
    code: (text) => `
      <section style="background-color: #f5f5f7; border-radius: 8px; margin: 24px 0; overflow: hidden; border: 1px solid #e5e5e5;">
        <div style="background-color: #e8e8ed; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #1d1d1f; font-size: 14px; font-family: ui-monospace, SFMono-Regular, monospace; overflow-x: auto;">
          ${text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
        </div>
      </section>`,
    strong: (text) => `<strong style="color: #000; font-weight: 700; background: #f5f5f7; padding: 2px 4px; border-radius: 4px;">${text}</strong>`
  },

  emotion: {
    wrapperStyle: `max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; color: #4a4a4a; line-height: 2; letter-spacing: 1px; padding: 20px; box-sizing: border-box; background-color: #fff;`,
    h1: (text) => `
        <section style="margin: 30px 0 40px; text-align: center;">
            <h1 style="font-size: 22px; color: #ff5e7e; font-weight: normal; line-height: 1.6; margin-bottom: 15px; border-bottom: 1px solid #ffe3e8; padding-bottom: 15px;">${text}</h1>
            <p style="font-size: 13px; color: #ffb3c6; margin: 0; letter-spacing: 2px;">「 陪你度过漫长岁月 」</p>
        </section>`,
    h2: (text, rawText) => {
      const display = rawText.match(/^([\d]+)[ \.]*(.*)$/) ? text.replace(/^([\d]+)[ \.]*/, '') : text;
      return `<div style="text-align: center; margin: 45px 0 25px;"><h2 style="display: inline-block; background: linear-gradient(to right, #fff0f3, #fff); padding: 6px 20px; border-radius: 30px; color: #ff5e7e; font-size: 17px; font-weight: bold; margin: 0;">${display}</h2></div>`;
    },
    h3: (text) => `<h3 style="font-size: 15px; color: #ff8fa3; font-weight: bold; border-left: 3px solid #ff8fa3; padding-left: 12px; margin: 30px 0 15px 0;">${text}</h3>`,
    h4: (text) => `
        <section style="background-color: #fff0f3; color: #d6336c; padding: 20px; border-radius: 12px; font-size: 14px; line-height: 1.8; text-align: center; margin: 25px 0;">
            <p style="margin: 0; font-weight: 500; letter-spacing: 1.5px;">暖心寄语：${text}</p>
        </section>`,
    blockquote: (html) => `
      <section style="background-color: #fdf2f4; border-left: 4px solid #ffb3c6; padding: 15px 20px; border-radius: 0 8px 8px 0; margin: 25px 0;">
          ${html.replace(/<p(.*?)>/g, '<p style="margin: 0 0 8px 0; font-size: 15px; color: #855b64; font-style: italic; line-height: 1.8;">')}
      </section>`,
    p: (text) => `<p style="font-size: 16px; color: #555; margin-bottom: 22px; text-align: justify; line-height: 2; letter-spacing: 1px;">${text}</p>`,
    code: (text) => `
      <section style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; margin: 25px 0; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <div style="background-color: #f1f3f5; padding: 10px 15px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #e9ecef;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFb3c6;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFdf65;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #92e6a7;"></span>
        </div>
        <div style="padding: 15px 20px; color: #495057; font-size: 14px; line-height: 1.8; overflow-x: auto;">
          <span style="display: block; color: #adb5bd; font-size: 12px; margin-bottom: 8px;">对话 / 留言：</span>
          ${text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
        </div>
      </section>`,
    strong: (text) => `<strong style="color: #e03131; font-weight: bold; text-decoration: underline; text-decoration-color: #ffb3c6; text-decoration-thickness: 2px; text-underline-offset: 4px;">${text}</strong>`
  },

  indigo: {
    wrapperStyle: `max-width: 650px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.75; letter-spacing: 0.5px; padding: 15px; box-sizing: border-box; background-color: #fff;`,
    h1: (text) => `
        <section style="margin-bottom: 30px; text-align: center;">
            <h1 style="font-size: 24px; color: #1a1a1a; font-weight: bold; line-height: 1.5; margin-bottom: 12px;">${text}</h1>
        </section>`,
    h2: (text) => `<h2 style="font-size: 18px; color: #2A3F82; font-weight: bold; margin: 35px 0 15px;">${text}</h2>`,
    h3: (text) => `<h3 style="font-size: 16px; color: #2A3F82; font-weight: bold; margin: 25px 0 12px 0;">${text}</h3>`,
    h4: (text) => `
        <section style="background-color: #F7EEF6; padding: 18px 20px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0; font-size: 15px; color: #4A3A4A; line-height: 1.7; display: flex; align-items: flex-start; gap: 8px;">
                <span style="color: #E24C4B;">💡</span><span>${text}</span>
            </p>
        </section>`,
    blockquote: (html) => `
      <section style="background-color: #F4F4F9; border-left: 4px solid #2A3F82; padding: 18px 20px; margin: 20px 0;">
          ${html.replace(/<p(.*?)>/g, '<p style="margin: 0 0 10px 0; font-size: 15px; color: #3A3A3A; line-height: 1.7; text-align: justify;">')}
      </section>`,
    p: (text) => `<p style="font-size: 15px; color: #444; margin-bottom: 20px; line-height: 1.8; text-align: justify; word-wrap: break-word;">${text}</p>`,
    code: (text) => `
      <section style="background-color: #2D2D2D; border-radius: 6px; margin: 20px 0; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <div style="background-color: #1E1E1E; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #E3E3E3; font-size: 14px; font-family: Consolas, monospace; overflow-x: auto; line-height: 1.6;">
          ${text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
        </div>
      </section>`,
    strong: (text) => `<strong style="font-weight: bold; color: #2A3F82;">${text}</strong>`,
    table: (header, body) => `
      <section style="overflow-x: auto; margin: 25px 0;">
        <table style="border-collapse: collapse; width: 100%; font-size: 14px; min-width: 400px; text-align: left; margin: 0; border: 1px solid #EAEAEA;">
          <thead style="background-color: #2A3F82; color: #fff;">
            <tr>${header}</tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </section>`,
    tablecell: (text, isHeader, align) => {
      const alignStyle = align ? `text-align: ${align};` : '';
      if (isHeader) {
         return `<th style="padding: 12px 15px; font-weight: normal; ${alignStyle} border: 1px solid #2A3F82;">${text}</th>`;
      }
      return `<td style="padding: 12px 15px; ${alignStyle} border: 1px solid #EAEAEA; color: #444;">${text}</td>`;
    }
  },

  geek: {
    wrapperStyle: `max-width: 650px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.8; letter-spacing: 0.5px; padding: 20px; box-sizing: border-box; background-color: #fff;`,
    h1: (text) => `
        <h1 style="font-size: 26px; color: #111; font-weight: 900; line-height: 1.4; margin: 30px 0 20px;">${text}</h1>`,
    h2: (text, rawText) => {
      const display = rawText.match(/^([\d]+)[ \.]*(.*)$/) ? text.replace(/^([\d]+)[ \.]*/, '$1. ') : text;
      return `<h2 style="font-size: 22px; color: #111; font-weight: 900; margin: 50px 0 25px; line-height: 1.5; letter-spacing: 1px;">${display}</h2>`;
    },
    h3: (text) => `<h3 style="font-size: 16px; font-weight: bold; color: #D97706; margin: 35px 0 15px; line-height: 1.6;">${text}</h3>`,
    h4: (text) => `<h4 style="font-size: 15px; font-weight: bold; color: #111; margin: 25px 0 15px;">${text}</h4>`,
    blockquote: (html) => `
      <section style="background-color: #FFF9F0; border-radius: 8px; padding: 20px; margin: 25px 0;">
          ${html.replace(/<p(.*?)>/g, '<p style="margin: 0 0 10px 0; font-size: 15px; color: #4A4A4A; line-height: 1.8;">')}
      </section>`,
    p: (text) => `<p style="font-size: 15px; color: #333; margin-bottom: 20px; line-height: 1.8; text-align: justify; word-wrap: break-word;">${text}</p>`,
    code: (text) => `
      <section style="background-color: #1E1E1E; border-radius: 8px; margin: 25px 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background-color: #2D2D2D; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FF5F56;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #FFBD2E;"></span>
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #27C93F;"></span>
        </div>
        <div style="padding: 15px 20px; color: #A6ACCD; font-size: 14px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; overflow-x: auto; line-height: 1.6;">
          ${text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
        </div>
      </section>`,
    codespan: (text) => `<code style="background-color: #F3F4F6; padding: 3px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 14px; color: #4B5563; margin: 0 2px;">${text}</code>`,
    strong: (text) => `<strong style="font-weight: 900; color: #111;">${text}</strong>`
  }
};

export function getWechatRenderer(themeKey: WechatTheme) {
  const t = themes[themeKey] || themes['tech'];
  const renderer = new marked.Renderer();

  renderer.heading = function (token: any) {
    const text = this.parser.parseInline(token.tokens);
    const depth = token.depth;
    const rawText = token.text; 

    if (depth === 1) return t.h1(text);
    if (depth === 2) return t.h2(text, rawText);
    if (depth === 3) return t.h3(text, rawText);
    if (depth === 4) return t.h4(text);
    return `<h${depth} style="margin-top:20px; font-weight:bold; color:#333;">${text}</h${depth}>`;
  };

  renderer.blockquote = function (token: any) {
    const body = this.parser.parse(token.tokens);
    return t.blockquote(body);
  };

  renderer.paragraph = function (token: any) {
    const text = this.parser.parseInline(token.tokens);
    return t.p(text);
  };

  renderer.code = function (token: any) {
    return t.code(token.text);
  };

  renderer.codespan = function (token: any) {
    const text = token.text;
    if (t.codespan) return t.codespan(text);
    // Default codespan
    return `<code style="background-color: #f1f3f5; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 0.9em; color: #e83e8c;">${text}</code>`;
  };

  renderer.strong = function (token: any) {
    const text = this.parser.parseInline(token.tokens);
    return t.strong(text);
  };

  renderer.listitem = function (token: any) {
    let text = '';
    if (token.tokens) {
      // Parse block or nested tokens
      text = this.parser.parse(token.tokens);
      // Remove the default paragraph margins mapped inside list items
      text = text.replace(/<p[^>]*>/g, '<span style="display:block; margin-bottom: 4px;">').replace(/<\/p>/g, '</span>');
    }
    return `<li style="margin-bottom: 8px; line-height: 1.6; color: inherit; font-size: 15px;">${text}</li>`;
  };

  renderer.list = function (token: any) {
    let body = '';
    for (const item of token.items) {
      body += renderer.listitem.call(this, item);
    }
    const tag = token.ordered ? 'ol' : 'ul';
    return `<${tag} style="padding-left: 24px; color: inherit; margin-bottom: 20px; font-size: 15px;">${body}</${tag}>`;
  };

  renderer.table = function (token: any) {
    let header = '';
    for (const cell of token.header) {
      header += this.tablecell(cell);
    }
    let body = '';
    for (const row of token.rows) {
      let rowHtml = '';
      for (const cell of row) {
        rowHtml += this.tablecell(cell);
      }
      body += this.tablerow({ text: rowHtml });
    }
    if (t.table) return t.table(header, body);
    
    // Default fallback table style
    return `<section style="overflow-x: auto; margin: 20px 0;">
      <table style="border-collapse: collapse; width: 100%; font-size: 14px; min-width: 400px; text-align: left;">
        <thead><tr style="background-color: #f8f9fa;">${header}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </section>`;
  };

  renderer.tablerow = function (token: any) {
    return `<tr>${token.text}</tr>`;
  };

  renderer.tablecell = function (token: any) {
    const text = this.parser.parseInline(token.tokens);
    const isHeader = token.header;
    const align = token.align;
    if (t.tablecell) return t.tablecell(text, isHeader, align);

    // Default fallback style
    const alignStyle = align ? `text-align: ${align};` : '';
    if (isHeader) {
       return `<th style="padding: 10px; border: 1px solid #ddd; ${alignStyle} font-weight: bold; color: #333;">${text}</th>`;
    }
    return `<td style="padding: 10px; border: 1px solid #ddd; ${alignStyle} color: #555;">${text}</td>`;
  };

  return renderer;
}

export function renderWechatHtml(markdown: string, theme: WechatTheme = 'tech'): string {
  if (!markdown || !markdown.trim()) {
    return '';
  }

  const renderer = getWechatRenderer(theme);
  const wrapperStyle = themes[theme]?.wrapperStyle || themes['tech'].wrapperStyle;
  
  const wrapperStart = `<section style="${wrapperStyle}">`;
  const wrapperEnd = `</section>`;
  
  const innerHtml = marked.parse(markdown, { renderer, breaks: true, gfm: true }) as string;
  
  return wrapperStart + innerHtml + wrapperEnd;
}
