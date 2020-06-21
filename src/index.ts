import { client } from './line';
import { morningFirstCall, weatherText } from './call';
import {
  SignatureValidationFailed,
  validateSignature,
  WebhookEvent,
} from '@line/bot-sdk';
import { lineConfig, masterUserId } from './secrets/line';

export function webhook(req: any, res: any) {
  const signature = req.get('x-line-signature');

  if (!signature) {
    throw new SignatureValidationFailed('no signature');
  }

  if (!validateSignature(req.rawBody, lineConfig.channelSecret, signature)) {
    throw new SignatureValidationFailed(
      'signature validation failed',
      signature
    );
  }

  return Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => console.error(error));
}

function handleEvent(event: WebhookEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'あら、私に話しかけても意味ありませんよ。',
  });
}

export async function morningCall() {
  try {
    client.pushMessage(masterUserId, {
      type: 'text',
      text: morningFirstCall(),
    });
    client.pushMessage(masterUserId, {
      type: 'text',
      text: await weatherText(),
    });
  } catch (error) {
    console.error(error);
  }
}
