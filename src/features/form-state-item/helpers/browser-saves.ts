const SAVES_PREFIX = "form-state-saves:";

export type BrowserSave = {
  id: string;
  name: string;
  createdAt: number;
  state: string;
};

function storageKey(formKey: string) {
  return SAVES_PREFIX + formKey;
}

export function getBrowserSaves(formKey: string): BrowserSave[] {
  const raw = localStorage.getItem(storageKey(formKey));

  if (!raw)
    return [];

  try {
    return JSON.parse(raw) as BrowserSave[];
  }
  catch {
    return [];
  }
}

function setBrowserSaves(formKey: string, saves: BrowserSave[]) {
  localStorage.setItem(storageKey(formKey), JSON.stringify(saves));
  return saves;
}

export function addBrowserSave(formKey: string, name: string, state: string) {
  const save: BrowserSave = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    state
  };

  return setBrowserSaves(formKey, [save, ...getBrowserSaves(formKey)]);
}

export function removeBrowserSave(formKey: string, id: string) {
  return setBrowserSaves(formKey, getBrowserSaves(formKey).filter(save => save.id != id));
}