import { client } from './line';
import { morningFirstCall, weatherText } from './call';
import {
  SignatureValidationFailed,
  validateSignature,
  WebhookEvent,
} from '@line/bot-sdk';
import { lineConfig, masterUserId } from './secrets/line';
import { callToPlayTarot } from './tarot';
import { sleep } from './sleep';
import { fetchCat } from './cat';

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
    await client
      .pushMessage(masterUserId, {
        type: 'text',
        text: morningFirstCall(),
      })
      .then(async () => {
        client.pushMessage(masterUserId, {
          type: 'text',
          text: await weatherText(),
        });
      })
      .then(() => {
        return sleep(2);
      })
      .then(() => {
        const nowJp = new Date();
        nowJp.setHours(new Date().getHours() + 9);
        if (nowJp.getDay() === 1) {
          callToPlayTarot();
        }
      });
  } catch (error) {
    console.error(error);
  }
}

export async function meow() {
  try {
    const lines = [
      'お昼ね。まだ一日は長いから、猫の画像でも見て癒やされてください。',
      'お昼が開けて、一番眠たい時間。猫の画像でも見ましょう。',
      'にゃんにゃん',
      'お疲れ様マスター。また午後も頑張ってね。',
    ];
    const line = lines[Math.floor(Math.random() * (lines.length - 1))];
    console.log(line);
    await client
      .pushMessage(masterUserId, {
        type: 'text',
        text: line,
      })
      .then(() => {
        return sleep(2);
      })
      .then(async () => {
        const image1 = await fetchCat();
        const image2 = await fetchCat();
        const image3 = await fetchCat();
        console.log(image1);
        console.log(image2);
        console.log(image3);
        return Promise.all([
          client.pushMessage(masterUserId, {
            type: 'image',
            originalContentUrl: image1,
            previewImageUrl: image1,
          }),
          client.pushMessage(masterUserId, {
            type: 'image',
            originalContentUrl: image2,
            previewImageUrl: image2,
          }),
          client.pushMessage(masterUserId, {
            type: 'image',
            originalContentUrl: image3,
            previewImageUrl: image3,
          }),
        ]);
      });
  } catch (error) {
    console.error(error);
  }
}
