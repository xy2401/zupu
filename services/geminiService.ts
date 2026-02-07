
import { GoogleGenAI } from "@google/genai";
import { Person } from "../types";

export async function generateBiography(person: Person, familyName: string, origin: string): Promise<string> {
  // 检查 API KEY 是否存在，避免浏览器端初始化报错导致整个应用崩溃
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    console.warn("Gemini API Key is not configured. AI features are disabled.");
    return "系统未配置 AI 接口（API_KEY），无法自动生成传记。请联系管理员在 GitHub Secrets 中配置 API_KEY，或手动完善成员生平。";
  }

  try {
    // 仅在调用时初始化，确保应用在没有 Key 的情况下也能正常加载 UI
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      请为以下这位家族成员撰写一段富有文学色彩、感人至深的生平传记：
      姓名：${familyName}${person.name}
      性别：${person.gender === 'male' ? '男' : '女'}
      祖籍：${origin}
      出生日期：${person.birthDate || '不详'}
      职业：${person.occupation || '不详'}
      
      要求：
      1. 使用典雅的中文叙事风格。
      2. 结合其所处的时代背景（如果是民国或清末）。
      3. 强调其在家族传承中的地位。
      4. 字数约200-300字。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "未能生成传记内容。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服务请求失败，请检查网络或 API 状态。目前您可以先手动输入相关资料。";
  }
}
