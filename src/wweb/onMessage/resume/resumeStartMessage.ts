import { groupCreate } from '../../../group/groupCreate';
import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';

const resumeStartMessage = async (msg: Message) => {
  if (!msg.body) {
    return;
  }

  const groupId = msg.id.remote;

  const payload = {
    groupId,
  };

  await groupCreate({ payload });

  msg.react('✅');
};

export default middleware(resumeStartMessage, { onlyOwner: true });
