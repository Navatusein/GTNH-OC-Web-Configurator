export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], {type: "text/plain"});
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
}

export function pickTextFile(accept: string): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;

    input.onchange = async () => {
      const file = input.files?.[0];
      resolve(file ? await file.text() : null);
    };

    input.click();
  });
}