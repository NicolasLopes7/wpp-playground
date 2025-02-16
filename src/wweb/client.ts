import { Client, LocalAuth } from 'whatsapp-web.js';
import { onReady } from './onReady';
import { onMessage } from './onMessage';
import { onAuthFailure } from './onAuthFailure';
import { onQrCode } from './onQrCode';

const wwebVersion = '2.2412.54';

export const client = new Client({
  authStrategy: new LocalAuth(),
  authTimeoutMs: 60 * 1000,
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  webVersionCache: {
    type: 'remote',
    remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
  },
});

export const connectClient = () => {
  console.log('Connecting to WhatsApp Web...');
  client.initialize();

  onQrCode();

  onReady();

  onAuthFailure();

  onMessage();
};
