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
  openWindows.update(windows => [...windows, window]);
}

export function removeWindow(windowId: string) {
  openWindows.update(windows => windows.filter(w => w.id !== windowId));
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