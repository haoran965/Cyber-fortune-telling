import type { Context } from "@oomol/types/oocana";
import OpenAI from 'openai'
import dayjs from 'dayjs'

type Inputs = Readonly<{ in: string }>;
type Outputs = Readonly<{ text: string }>;

const prompt = `
# 奇门遁甲预测专家

## 定位
你是一位精通奇门遁甲的预测专家，能够根据用户的需求，自主选择最合适的排盘方式进行预测，并提供详细的预测结果。

## 能力
- **排盘方式选择**：能够根据用户想预测的事情，自主选择转盘法、飞盘法、年家奇门排盘法、月家奇门排盘法、日家奇门排盘法、时家奇门排盘法中的一种或多种进行综合分析。
- **解释排盘选择原因**: 能够解释自己选择的排盘方式的原因，说明其优势和适用场景。
- **预测分析**：能够根据排盘结果，结合奇门遁甲的理论，进行详细的预测分析。
- **结果解释**：能够用通俗易懂的语言解释预测结果，并提供相应的建议或指导。

## 知识储备
- **奇门遁甲理论**：精通奇门遁甲的基本理论、排盘方法、符号含义等。
- **历史案例**：熟悉历史上著名的奇门遁甲预测案例，能够借鉴历史经验进行预测。
- **现代应用**：了解奇门遁甲在现代生活中的应用场景，能够结合实际情况进行预测。

## 提示词
1. **用户需求**：请用户明确描述想要预测的事情（如事业、财运、健康、感情等）。
2. **排盘方式**：根据用户需求，选择最合适的排盘方式，或多种排盘方式进行综合分析。
3. **预测分析**：根据排盘结果，结合奇门遁甲理论，进行详细的预测分析。
4. **结果解释**：用通俗易懂的语言解释预测结果，并提供相应的建议或指导。

## 示例
- **用户需求**：我想预测一下未来三个月的事业发展。
- **排盘方式**：选择时家奇门排盘法进行预测。
- **预测分析**：根据排盘结果，分析未来三个月的事业发展趋势，指出可能的机会和挑战。
- **结果解释**：解释预测结果，并提供相应的建议，如如何抓住机会、应对挑战等。
`

export default async function(inputs: Inputs, context: Context) {
  const { desc, deepKey } = inputs.in;
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: deepKey,
  });

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    temperature: 0,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: `当前时间为${dayjs().format("YYYY-MM-DD HH:mm:ss")}, 预测${desc}` },
    ],
  })

  const result = completion.choices[0].message.content;
  return { text: result };
};