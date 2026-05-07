"use client";

import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiArrowUp, FiMinus, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import Image from "next/image";

import chatProfile from "@/data/chatProfile.json";

import styles from "./index.module.css";

type MessageRole = "assistant" | "user";
type SoundCue = "open" | "send" | "reply";

type WindowWithWebAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

const INITIAL_GREETING = chatProfile.initialGreeting;

const STARTER_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: INITIAL_GREETING,
};

function createMessage(role: MessageRole, content: string): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
  };
}

function renderInlineText(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      const strongMatch = part.match(/^\*\*(.+)\*\*$/);

      if (strongMatch) {
        return (
          <strong key={`${keyPrefix}-strong-${index}`}>{strongMatch[1]}</strong>
        );
      }

      return (
        <span key={`${keyPrefix}-text-${index}`}>
          {part.replace(/\*/g, "")}
        </span>
      );
    });
}

function renderMessageContent(content: string) {
  const blocks: ReactNode[] = [];
  const bulletItems: string[] = [];

  function flushBullets() {
    if (bulletItems.length === 0) return;

    const listIndex = blocks.length;
    blocks.push(
      <ul className={styles.messageList} key={`list-${listIndex}`}>
        {bulletItems.splice(0).map((item, index) => (
          <li key={`list-${listIndex}-item-${index}`}>
            {renderInlineText(item, `list-${listIndex}-item-${index}`)}
          </li>
        ))}
      </ul>,
    );
  }

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushBullets();
      return;
    }

    const bulletMatch = trimmed.match(/^[*-]\s+(.+)$/);

    if (bulletMatch) {
      bulletItems.push(bulletMatch[1]);
      return;
    }

    flushBullets();

    const paragraphIndex = blocks.length;
    blocks.push(
      <p
        className={styles.messageParagraph}
        key={`paragraph-${paragraphIndex}`}
      >
        {renderInlineText(trimmed, `paragraph-${paragraphIndex}`)}
      </p>,
    );
  });

  flushBullets();

  return <div className={styles.messageContent}>{blocks}</div>;
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([STARTER_MESSAGE]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [introVisible, setIntroVisible] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasPlayedIntroRef = useRef(false);

  const playCue = useCallback(
    (cue: SoundCue) => {
      if (!soundEnabled || typeof window === "undefined") return;

      const browserWindow = window as WindowWithWebAudio;
      const AudioContextConstructor =
        window.AudioContext || browserWindow.webkitAudioContext;

      if (!AudioContextConstructor) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextConstructor();
      }

      const context = audioContextRef.current;
      const tones: Record<SoundCue, { frequency: number; duration: number }> = {
        open: { frequency: 640, duration: 0.08 },
        send: { frequency: 520, duration: 0.055 },
        reply: { frequency: 720, duration: 0.07 },
      };
      const { frequency, duration } = tones[cue];

      void context
        .resume()
        .then(() => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const now = context.currentTime;

          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(frequency, now);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.035, now + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(now);
          oscillator.stop(now + duration + 0.02);
        })
        .catch(() => undefined);
    },
    [soundEnabled],
  );

  const speakText = useCallback(
    (text: string) => {
      if (!soundEnabled || typeof window === "undefined") return;
      if (
        !("speechSynthesis" in window) ||
        !("SpeechSynthesisUtterance" in window)
      ) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.98;
      utterance.pitch = 1.02;
      utterance.volume = 0.82;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [soundEnabled],
  );

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setIntroVisible(false), 7600);

    if (hasPlayedIntroRef.current) {
      return () => window.clearTimeout(hideTimer);
    }

    hasPlayedIntroRef.current = true;

    let hasPlayedInSession = false;

    try {
      hasPlayedInSession =
        window.sessionStorage.getItem("ck-chat-intro-played") === "true";
    } catch {
      hasPlayedInSession = false;
    }

    if (hasPlayedInSession) {
      return () => window.clearTimeout(hideTimer);
    }

    const speechTimer = window.setTimeout(() => {
      speakText(INITIAL_GREETING);

      try {
        window.sessionStorage.setItem("ck-chat-intro-played", "true");
      } catch {
        // Browsers can block sessionStorage in private contexts.
      }
    }, 850);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(speechTimer);
    };
  }, [speakText]);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  async function sendMessage(nextMessage: string) {
    const trimmed = nextMessage.trim();
    if (!trimmed || isSending) return;

    const userMessage = createMessage("user", trimmed);
    const visibleMessages = [...messages, userMessage];

    setMessages(visibleMessages);
    setInput("");
    setError("");
    setIsSending(true);
    playCue("send");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-6).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "CK Chat could not reply right now.");
      }

      const reply =
        data.reply ||
        "I do not have that detail here yet. You can contact me directly.";

      setMessages((current) => [...current, createMessage("assistant", reply)]);
      playCue("reply");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "CK Chat could not reply right now.";
      setError(message);
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "That did not go through. Please try again.",
        ),
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handlePromptClick(prompt: string) {
    setIsOpen(true);
    setIntroVisible(false);
    void sendMessage(prompt);
  }

  function handleLauncherClick() {
    setIsOpen((current) => {
      const next = !current;

      if (next) {
        setIntroVisible(false);
        playCue("open");
      }

      return next;
    });
  }

  return (
    <aside
      className={`${styles.chatbot} ${isOpen ? styles.chatbotOpen : ""}`}
      aria-label="Cu Kang portfolio chatbot"
    >
      {isOpen && (
        <section className={styles.panel} aria-live="polite">
          <header className={styles.header}>
            <div className={styles.identity}>
              <span className={styles.headerAvatar} aria-hidden="true">
                <Image
                  src="/images/ck_chaticon.png"
                  alt=""
                  width={298}
                  height={302}
                  priority={false}
                />
                <span className={styles.statusDot} />
              </span>
              <div>
                <h2>Chat with me</h2>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.iconButton}
                type="button"
                onClick={() => setSoundEnabled((current) => !current)}
                aria-label={
                  soundEnabled ? "Mute chat sounds" : "Enable chat sounds"
                }
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
              >
                {soundEnabled ? (
                  <FiVolume2 aria-hidden="true" />
                ) : (
                  <FiVolumeX aria-hidden="true" />
                )}
              </button>
              <button
                className={styles.iconButton}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize chat"
                title="Minimize"
              >
                <FiMinus aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className={styles.messages} ref={listRef}>
            {messages.map((message) => (
              <div
                className={`${styles.messageRow} ${
                  message.role === "user" ? styles.messageRowUser : ""
                }`}
                key={message.id}
              >
                {message.role === "assistant" && (
                  <span className={styles.messageAvatar} aria-hidden="true">
                    CK
                  </span>
                )}
                <div
                  className={`${styles.bubble} ${
                    message.role === "user"
                      ? styles.bubbleUser
                      : styles.bubbleAssistant
                  }`}
                >
                  {renderMessageContent(message.content)}
                </div>
              </div>
            ))}
            {isSending && (
              <div className={styles.messageRow}>
                <span className={styles.messageAvatar} aria-hidden="true">
                  CK
                </span>
                <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
                  <span className={styles.typingLabel}>I&apos;m thinking</span>
                  <span className={styles.typingDots} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}
          </div>

          {!input.trim() && (
            <div className={styles.promptGrid}>
              {chatProfile.suggestedPrompts.map((prompt) => (
                <button
                  className={styles.prompt}
                  disabled={isSending}
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  type="button"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              aria-label="Ask CK Chat"
              disabled={isSending}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Cu Kang..."
              ref={inputRef}
              type="text"
              value={input}
            />
            <button
              className={styles.sendButton}
              disabled={!input.trim() || isSending}
              type="submit"
              aria-label="Send message"
              title="Send"
            >
              <FiArrowUp aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      {!isOpen && introVisible && (
        <button
          className={styles.introBubble}
          type="button"
          onClick={handleLauncherClick}
          aria-label="Open CK Chat"
        >
          <span>Hey, I&apos;m CK.</span>
          <small>Ask me about my frontend work.</small>
        </button>
      )}

      <button
        className={styles.launcher}
        type="button"
        onClick={handleLauncherClick}
        aria-label={isOpen ? "Close CK Chat" : "Open CK Chat"}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <FiX aria-hidden="true" />
        ) : (
          <Image
            src="/images/ck_chaticon.png"
            alt=""
            aria-hidden="true"
            width={298}
            height={302}
            priority={false}
          />
        )}
        <span className={styles.launcherPulse} aria-hidden="true" />
      </button>
    </aside>
  );
}
