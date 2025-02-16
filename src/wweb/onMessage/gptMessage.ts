import { Message } from 'whatsapp-web.js';
import { openai } from '../../openai/openaiApi';
import { OPENAI_MODEL_ENUM } from '../../openai/openaiModelEnum';

const gptMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL_ENUM.GPT_3_5_TURBO,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: msg.body,
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    msg.reply(response.choices[0].message.content);
  } catch (error) {
    console.error(error);

    msg.reply('Error while trying to resume messages');
  }
};

export default gptMessage;
