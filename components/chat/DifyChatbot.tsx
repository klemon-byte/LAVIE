'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const TOKEN = 'GVMh4vhjcqMhXz85';
const BASE_URL = 'https://udify.app';
const BUTTON_ID = 'dify-chatbot-bubble-button';
const FRAME_ID = 'dify-chatbot-bubble-window';

declare global {
  interface Window {
    difyChatbotConfig?: {
      token: string;
      baseUrl: string;
      dynamicScript: boolean;
      inputs: Record<string, string>;
      systemVariables: Record<string, string>;
      userVariables: Record<string, string>;
      containerProps: {
        role: string;
        tabIndex: number;
        onKeyDown: (event: KeyboardEvent) => void;
      };
    };
  }
}

export default function DifyChatbot() {
  const [configured, setConfigured] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const pathname = usePathname();
  const hidden = pathname?.startsWith('/admin');

  useEffect(() => {
    // Dify otherwise waits for body.onload, which has already fired for a lazy Next script.
    window.difyChatbotConfig = {
      token: TOKEN,
      baseUrl: BASE_URL,
      dynamicScript: true,
      inputs: {},
      systemVariables: {},
      userVariables: {},
      containerProps: {
        role: 'button',
        tabIndex: 0,
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            (event.currentTarget as HTMLElement).click();
          }
        },
      },
    };
    setConfigured(true);

    let observedFrame: HTMLElement | null = null;
    const frameObserver = new MutationObserver(syncAccessibility);
    function syncAccessibility() {
      const button = document.getElementById(BUTTON_ID);
      const frame = document.getElementById(FRAME_ID);
      const open = !!frame && frame.style.display !== 'none';
      if (button) {
        button.setAttribute('aria-label', open ? 'Đóng trợ lý AI LAVIE' : 'Chat với trợ lý AI LAVIE');
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-controls', FRAME_ID);
        button.title = open ? 'Đóng trợ lý AI LAVIE' : 'Chat với trợ lý AI LAVIE';
      }
      if (frame && frame !== observedFrame) {
        frame.title = 'Trợ lý AI LAVIE';
        frameObserver.disconnect();
        frameObserver.observe(frame, { attributes: true, attributeFilter: ['style'] });
        observedFrame = frame;
      }
      document.documentElement.toggleAttribute('data-lavie-chat-open', open);
    }
    const observer = new MutationObserver(syncAccessibility);
    observer.observe(document.body, { childList: true });
    syncAccessibility();
    return () => {
      observer.disconnect();
      frameObserver.disconnect();
      document.documentElement.removeAttribute('data-lavie-chat-open');
    };
  }, []);

  return <>
    {hidden && <span hidden data-lavie-chat-disabled />}
    {configured && !hidden && <Script
      id={TOKEN}
      src={`${BASE_URL}/embed.min.js`}
      strategy="lazyOnload"
      onError={() => setLoadFailed(true)}
    />}
    {loadFailed && !hidden && <a className="lv-chat-fallback" href={`${BASE_URL}/chatbot/${TOKEN}`} target="_blank" rel="noopener noreferrer">Mở trợ lý AI LAVIE ↗</a>}
  </>;
}
