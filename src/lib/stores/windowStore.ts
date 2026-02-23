import { writable } from 'svelte/store';
import type { WindowDefinition } from '$lib/types/window';

export interface OpenWindow {
  id: string;
  title: string;
  size: { width: number | "full"; height: number | "full"  };
  constrainToPortal?: boolean;
  portalId?: string;
  component: any; // The Svelte component to render
  props?: Record<string, any>;
  paneState?: any;
  renderTitlebar?: boolean;
  useDefaultMargins?: boolean // Whether to apply the default window-body class to the contents. This removes the default padding. TODO: is this wording weird?
}

export const openWindows = writable<OpenWindow[]>([]);

export function addWindow(window: OpenWindow) {
  openWindows.update(windows => {
    const existingIndex = windows.findIndex(w => w.id === window.id);
    if (existingIndex === -1) {
      return [...windows, window];
    }

    const updated = [...windows];
    updated[existingIndex] = window;
    return updated;
  });
}

export function removeWindow(windowId: string) {
  openWindows.update(windows => windows.filter(w => w.id !== windowId));
}

export function replaceWindow(removeId: string, newWindow: OpenWindow) {
  openWindows.update(windows => {
    const index = windows.findIndex(w => w.id === removeId);
    if (index === -1) {
      // removeId not found — use addWindow logic to avoid duplicates
      const existingNewIndex = windows.findIndex(w => w.id === newWindow.id);
      if (existingNewIndex !== -1) {
        const updated = [...windows];
        updated[existingNewIndex] = newWindow;
        return updated;
      }
      return [...windows, newWindow];
    }
    const updated = [...windows];
    updated[index] = newWindow;
    return updated;
  });
}

export function clearWindows() {
  openWindows.set([]);
}

export function getOpenWindows() {
  let windows: OpenWindow[];
  openWindows.subscribe(value => {
    windows = value;
  })();
  return windows!;
}

