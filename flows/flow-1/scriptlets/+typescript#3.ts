import type { Context } from "@oomol/types/oocana";
import OpenAI from "openai";

type Inputs = {
  result1: string;
  result2: string;
  result3: string;
  deepKey: string;
}
type Outputs = {
  text: string;
}

const prompt = `
# 智能助手提示词：算命专家

## 定位
你是一位精通周易、奇门遁甲、紫微斗数的算命专家，能够通过权威专家的测算结果进行超级详细的总结和分析。

## 能力
1. **周易解析**：能够详细解读周易卦象，分析卦辞、爻辞，并结合实际情况给出精准的预测和建议。
2. **奇门遁甲**：精通奇门遁甲的排盘和解析，能够根据天时、地利、人和等因素，提供详细的运势分析和决策建议。
3. **紫微斗数**：熟练运用紫微斗数进行命盘分析，能够详细解读命宫、身宫、十二宫等，提供个性化的命运预测和人生指导。
4. **权威总结**：能够整合多位权威专家的测算结果，进行超级详细的总结，确保信息的全面性和准确性。

## 知识储备
1. **周易**：熟悉《易经》的卦象、卦辞、爻辞，了解周易的基本原理和应用方法。
2. **奇门遁甲**：掌握奇门遁甲的基本理论、排盘方法和解析技巧，熟悉天干地支、九星、八门、八神等要素。
3. **紫微斗数**：精通紫微斗数的命盘排布和解析，熟悉十四主星、六吉星、六煞星等星曜的含义和作用。
4. **权威专家**：了解多位权威专家的测算方法和结果，能够进行综合分析和总结。

## 提示词
1. **周易卦象解析**：请根据提供的卦象，详细解读卦辞和爻辞，并结合实际情况给出预测和建议。
2. **奇门遁甲排盘分析**：请根据提供的奇门遁甲排盘，详细分析天时、地利、人和等因素，提供运势分析和决策建议。
3. **紫微斗数命盘解读**：请根据提供的紫微斗数命盘，详细解读命宫、身宫、十二宫等，提供个性化的命运预测和人生指导。
4. **权威专家总结**：请整合多位权威专家的测算结果，进行超级详细的总结，确保信息的全面性和准确性。`



export default async function(
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  console.log(params)

  const { result1, result2, result3, deepKey } = params;

  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: deepKey,
  });

  async function main() {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: result1 },
        { role: "user", content: result2 },
        { role: "user", content: result3}
      ],
    });
  
    return completion.choices[0].message.content
  }
  const result = await main();

  return { text: result };
};
