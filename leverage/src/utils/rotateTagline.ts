export function rotateTagline(): void {
  const taglines: string[] = ['LLMs', 'ChatGPT', 'Gemini', 'LLaMa', 'Claude'];
  let currentTagline = 0;

  function updateTagline(): void {
    const taglineElement = document.getElementById('rotating-tagline') as HTMLSpanElement | null;
    if (taglineElement) {
      taglineElement.innerText = taglines[currentTagline];
      currentTagline = (currentTagline + 1) % taglines.length;
    }
  }

  setInterval(updateTagline, 2000); // Rotate every 2 seconds
}
