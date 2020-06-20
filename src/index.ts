import { client } from './line';
import { Request, Response } from 'express';
import {
  SignatureValidationFailed,
  validateSignature,
  WebhookEvent,
} from '@line/bot-sdk';
import { lineConfig } from './secrets/line';

export function webhook(req: Request, res: Response) {
  const signature = req.get('x-line-signature');

  if (!signature) {
    throw new SignatureValidationFailed('no signature');
  }

  // @ts-ignore Response@RequestにはrawBodyはないが、google functionsにはあるので問題なし
  if (!validateSignature(req.rawBody, lineConfig.channelSecret, signature)) {
    throw new SignatureValidationFailed(
      'signature validation failed',
      signature
    );
  }

  Promise.all(req.body.events.map(handleEvent))
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
    text: event.message.text,
  });
}
