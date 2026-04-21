'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Sparkles, Send, ArrowRight, ExternalLink } from 'lucide-react';
import { suggestedPrompts, getResponse, type ChatMessage } from '@/lib/ai/mockResponses';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Floating action button                                            */
/* ------------------------------------------------------------------ */

export function AskCohortButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open Ask Cohort"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center',
        'h-12 w-12 rounded-full',
        'bg-sky text-paper shadow-lg',
        'transition-transform duration-200 ease-out',
        'hover:scale-110 active:scale-95',
        'animate-[pulse-glow_2.5s_ease-in-out_infinite]',
        'cursor-pointer',
      )}
      style={{
        /* subtle pulsing shadow */
        animation: 'pulse-glow 2.5s ease-in-out infinite',
      }}
    >
      <Sparkles className="h-5 w-5" />

      {/* Inline keyframes for the pulsing glow */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,180,232,0.45); }
          50%       { box-shadow: 0 0 18px 6px rgba(74,180,232,0.25); }
        }
      `}</style>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer                                                            */
/* ------------------------------------------------------------------ */

export function AskCohortDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* Auto-scroll to bottom whenever messages change */
  const scrollToBottom = useCallback(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, scrollToBottom]);

  /* Focus textarea when drawer opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ---- Send a message ---- */
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isThinking) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsThinking(true);

      // Reset textarea height
      if (textareaRef.current) textareaRef.current.style.height = 'auto';

      setTimeout(() => {
        const result = getResponse(trimmed);

        const cohortMsg: ChatMessage = {
          id: `cohort-${Date.now()}`,
          role: 'cohort',
          content: result.response,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          attachments: result.attachments,
        };

        setMessages((prev) => [...prev, cohortMsg]);
        setIsThinking(false);
      }, 500);
    },
    [isThinking],
  );

  /* ---- Keyboard handling ---- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /* ---- Auto-resize textarea ---- */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-navy/30 backdrop-blur-[2px] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full flex-col',
          'w-full sm:w-[420px]',
          'bg-paper border-l border-line shadow-lg',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* ----- Header ----- */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-sky-soft">
              <Sparkles className="h-4 w-4 text-sky" />
            </div>
            <h2 className="font-display text-lg font-semibold text-navy tracking-tight">
              Ask Cohort
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg text-muted hover:bg-off hover:text-ink transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ----- Thread area ----- */}
        <div ref={threadRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-start gap-5 pt-4">
              <p className="font-display text-xl font-semibold text-navy tracking-tight">
                Hi Rachel&nbsp;&mdash; what do you want to&nbsp;know?
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className={cn(
                      'bg-sky-soft text-navy rounded-full px-4 py-2',
                      'text-[12px] font-semibold leading-snug text-left',
                      'hover:bg-sky hover:text-paper transition-colors duration-150',
                      'cursor-pointer',
                    )}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col max-w-[88%] animate-fade-up',
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start',
                  )}
                >
                  <div
                    className={cn(
                      'px-4 py-3 text-[13px] leading-relaxed whitespace-pre-wrap',
                      msg.role === 'user'
                        ? 'bg-sky text-paper rounded-xl rounded-tr-sm'
                        : 'bg-off text-ink rounded-xl rounded-tl-sm',
                    )}
                  >
                    {msg.content}
                  </div>

                  {/* Attachments */}
                  {msg.attachments?.map((att, idx) => {
                    if (att.type === 'table') {
                      return (
                        <div
                          key={idx}
                          className="mt-2 w-full overflow-x-auto rounded-lg border border-line bg-paper"
                        >
                          <table className="w-full text-[11px]">
                            <thead>
                              <tr className="border-b border-line">
                                {att.data.headers.map((h: string) => (
                                  <th
                                    key={h}
                                    className="px-3 py-2 text-left font-semibold text-muted uppercase tracking-wide"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {att.data.rows.map((row: string[], ri: number) => (
                                <tr
                                  key={ri}
                                  className="border-b border-line last:border-0"
                                >
                                  {row.map((cell: string, ci: number) => (
                                    <td
                                      key={ci}
                                      className="px-3 py-2 text-ink"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }

                    if (att.type === 'action') {
                      return (
                        <button
                          key={idx}
                          className={cn(
                            'mt-2 inline-flex items-center gap-1.5',
                            'rounded-lg border border-sky bg-sky-soft px-3 py-2',
                            'text-[12px] font-semibold text-sky',
                            'hover:bg-sky hover:text-paper transition-colors duration-150',
                            'cursor-pointer',
                          )}
                        >
                          {att.data.action === 'compose-email' ? (
                            <ExternalLink className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5" />
                          )}
                          {att.data.label}
                        </button>
                      );
                    }

                    return null;
                  })}

                  {/* Timestamp */}
                  <span className="mt-1 text-[10px] text-muted-soft">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <div className="flex items-start mr-auto animate-fade-up">
                  <div className="bg-off text-ink rounded-xl rounded-tl-sm px-4 py-3 text-[13px]">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky animate-bounce [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-sky animate-bounce [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-sky animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ----- Input area ----- */}
        <div className="border-t border-line px-4 pt-3 pb-4 bg-paper">
          <div className="flex items-end gap-2 rounded-xl border border-line bg-off px-3 py-2 focus-within:border-sky transition-colors">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your team, campaigns, or market..."
              rows={1}
              className={cn(
                'flex-1 resize-none bg-transparent text-[13px] text-ink',
                'placeholder:text-muted-soft outline-none',
                'max-h-[120px]',
              )}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isThinking}
              className={cn(
                'flex items-center justify-center h-8 w-8 rounded-lg',
                'bg-sky text-paper',
                'transition-all duration-150',
                'disabled:opacity-30 disabled:cursor-not-allowed',
                'hover:bg-sky-bright active:scale-95',
                'cursor-pointer',
                'shrink-0',
              )}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-soft">
            Cohort AI &middot; may make mistakes, verify before sharing
          </p>
        </div>
      </aside>
    </>
  );
}
