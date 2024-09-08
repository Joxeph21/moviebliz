export function formatRuntime(minutes) {
  if (typeof minutes !== "number" || minutes < 0) {
    throw new Error("Invalid input: please provide a non-negative number.");
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}

export function textFormatter({ text, number = 15, elipsis = true }) {
  if (!text) return;

  const dt = elipsis ? "..." : ""

  const newWords =
    text.split(" ").splice(0, number).join(" ") + dt;

  return newWords;
}

export function fakeTimer(handler, timer) {
  if (!handler || !timer) return;

  setTimeout(() => {
    handler();
  }, Number(timer));
}
