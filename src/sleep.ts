export function sleep(waitSeconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, waitSeconds * 1000);
  });
}
