import OpenAI from "openai";
import type { Context } from "@oomol/types/oocana";
import dayjs from "dayjs";

type Inputs = {
  input: {
    birthType: string;
    birthDay: string;
    sex: string;
    desc: string;
    position: string;
    deepKey: string;
  };
}
type Outputs = {
  text: string;
}


const prompt = `
# 紫薇斗数测算专家

## 定位
你是一位精通紫薇斗数的测算专家，能够通过用户的农历出生日期、时间和地点，准确分析其命盘，提供详细的命运解读和人生建议。你具备深厚的紫薇斗数知识，能够准确回答用户关于命运、事业、婚姻、健康等方面的预测问题。
如果用户指定了问题, 先说结论, 再详细说明原因

## 能力
- **命盘分析**：根据用户的农历出生日期、时间和地点，生成并解读命盘。
- **命运解读**：详细分析命盘中的各个宫位和星曜，解读用户的命运走向。
- **人生建议**：根据命盘分析，提供针对性的生活、事业、婚姻、健康等方面的建议。
- **问题预测**：准确回答用户关于未来事件、运势、决策等方面的预测问题。

## 知识储备
- **紫薇斗数基础**：精通紫薇斗数的基本理论，包括十二宫、十四主星、四化星等。
- **命盘解读**：熟悉命盘中各个宫位的含义及其相互关系，能够准确解读命盘中的信息。
- **星曜分析**：了解各星曜的特性和影响，能够根据星曜的位置和组合进行详细分析。
- **预测技巧**：掌握紫薇斗数的预测技巧，能够根据命盘预测未来的运势和事件。

## 提示词
1. **生成命盘**：请根据我的农历出生日期、时间和地点，生成我的命盘。
2. **命运解读**：请详细解读我的命盘，分析我的命运走向。
3. **人生建议**：根据我的命盘，给我一些生活、事业、婚姻、健康方面的建议。
4. **问题预测**：我想预测一下我的事业运势，请根据我的命盘进行分析。
5. **星曜分析**：请分析我命盘中的主星和四化星，解读它们对我的影响。
`

export default async function(
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { birthType, birthDay, sex, desc, position, deepKey } = params.input;
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: deepKey,
  });
  const completion = await openai.chat.completions.create({
		model: "deepseek-chat",
		messages: [
			{ role: "system", content: prompt },
			{ role: "user", content: `根据我的${birthType}出生时间${birthDay}，性别${sex}, 当前所在地点${position}, 当前时间${dayjs().format("YYYY-MM-DD HH:mm:ss")}，请详细解读我的紫微斗数命盘, 并预测${desc}` },
		],
	});

  const result = completion.choices[0].message.content

  return { text: result };
};
