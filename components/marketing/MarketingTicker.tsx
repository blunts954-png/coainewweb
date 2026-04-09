function TickerSequence({ seq, items }: { seq: string; items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <span key={`${seq}-${i}`}>
          <span>{t}</span>
          <span className="m-ticker-dot">●</span>
        </span>
      ))}
    </>
  );
}

export function MarketingTicker({ items }: { items: string[] }) {
  return (
    <div className="m-ticker-wrap">
      <div className="m-ticker-track" aria-hidden="true">
        <TickerSequence seq="a" items={items} />
        <TickerSequence seq="b" items={items} />
      </div>
    </div>
  );
}
