'use client';

export interface PurchaseItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type GTMEvents =
  | { event: 'page_view'; page_path: string }
  | {
      event: 'purchase';
      transaction_id: string;
      value: number;
      currency?: string;
      items?: PurchaseItem[];
    }
  | { event: 'sign_up'; method: string }
  | { event: 'click_button'; label: string }
  | { event: 'set_user'; user_id: string }
  | { event: 'set_user_properties'; user_type: string }
  | { event: 'scroll_depth'; page_path: string; depth_percent: number }
  | { event: 'section_view'; page_path: string; section_id: string }
  | { event: 'form_start'; form_name: string; page_path?: string }
  | { event: 'form_submit'; form_name: string; page_path?: string };

declare global {
  interface Window {
    dataLayer?: GTMEvents[];
  }
}

const pushToDataLayer = <T extends GTMEvents>(data: T): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
};

export function trackPageview(page_path: string): void {
  pushToDataLayer({ event: 'page_view', page_path });
}

export function trackPurchase(params: {
  currency?: string;
  items?: PurchaseItem[];
  transaction_id: string;
  value: number;
}): void {
  pushToDataLayer({ event: 'purchase', ...params });
}

export function trackSignUp(method: string): void {
  pushToDataLayer({ event: 'sign_up', method });
}

export function trackButtonClick(label: string): void {
  pushToDataLayer({ event: 'click_button', label });
}

export function setUser(user_id: string): void {
  pushToDataLayer({ event: 'set_user', user_id });
}

export function setUserProperties(user_type: string): void {
  pushToDataLayer({ event: 'set_user_properties', user_type });
}

export function trackCustomEvent<T extends GTMEvents>(data: T): void {
  pushToDataLayer(data);
}

export function trackScrollDepth(
  page_path: string,
  depth_percent: number,
): void {
  pushToDataLayer({ event: 'scroll_depth', page_path, depth_percent });
}

export function trackSectionView(page_path: string, section_id: string): void {
  pushToDataLayer({ event: 'section_view', page_path, section_id });
}

export function trackFormStart(form_name: string, page_path?: string): void {
  pushToDataLayer({
    event: 'form_start',
    form_name,
    ...(page_path && { page_path }),
  });
}

export function trackFormSubmit(form_name: string, page_path?: string): void {
  pushToDataLayer({
    event: 'form_submit',
    form_name,
    ...(page_path && { page_path }),
  });
}
