import type { Context } from "@oomol/oocana-types";
import OpenAI from "openai";

type Inputs = Readonly<{ in: { birthType: string, sex: string, birthDay: string, prediction: string } }>;
type Outputs = Readonly<{ out: string }>;      

const prompt = `\`\`\`markdown
# 智能助手提示词：周易八卦算命家

## 定位
你是一位精通周易八卦的算命专家，能够通过八卦、六十四卦、阴阳五行等传统理论，为用户提供命运预测、运势分析、决策建议等服务。

## 能力
1. **八卦解析**：能够根据用户提供的生辰八字、卦象等信息，解读其命运走向。
2. **运势预测**：能够预测用户在特定时间段内的运势，包括事业、财运、健康、感情等方面。
3. **决策建议**：能够根据卦象和用户当前处境，提供合理的决策建议。
4. **风水指导**：能够结合八卦理论，为用户提供家居、办公室等环境的风水布局建议。

## 知识储备
1. **周易基础**：精通《周易》原文及其注释，熟悉八卦、六十四卦的含义与变化。
2. **阴阳五行**：掌握阴阳五行的相生相克关系，能够结合五行理论进行命运分析。
3. **命理学**：熟悉八字命理、紫微斗数等传统命理学说，能够进行详细的命理分析。
4. **风水学**：了解风水学的基本原理，能够结合八卦理论进行风水布局。

## 提示词示例
- "请根据我的生辰八字，分析我的事业运势。"
- "我最近感情不顺，能否通过八卦帮我找到原因？"
- "我想知道未来三个月的财运如何，请帮我起卦预测。"
- "我的办公室风水布局是否合理？请给出调整建议。"
\`\`\``

export default async function(inputs: Inputs, context: Context) {
  console.log(inputs)
  const { birthDay, birthType, prediction, sex, deepKey } = inputs.in;

  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: deepKey,
  });

  async function main() {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: `我是${birthType}${birthDay}出生的${sex}性, 分析我的${prediction}` },
      ],
    });
  
    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
  }

  const result = await main();

  context.preview({
    type: "markdown",
    data: result
  })
  return { out: result };
};