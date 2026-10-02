import type { CSSProperties } from "react";

type WordsProps = {
  text: string;
  /** Set the last word in the italic serif, for emphasis. */
  accent?: boolean;
};

/**
 * A heading's text, split into words that rise out of a mask one after the
 * other. The motion is driven by CSS: inside a <Reveal> the words rise when it
 * comes into view; inside a `.hero-fade` element they rise on page load.
 * Screen readers get the plain sentence.
 */
export function Words({ text, accent = false }: WordsProps) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index}>
            <span className="word-mask">
              <span
                className={`word ${accent && words.length > 1 && index === words.length - 1 ? "serif-i" : ""}`}
                style={{ "--i": index } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}

/** A heading with its last word in the italic serif. */
export function Accented({ text }: { text: string }) {
  return <Words text={text} accent />;
}
