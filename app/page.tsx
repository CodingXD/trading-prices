import Graph from "./_components/Graph";
import Stat from "./_components/Stat";
import Symbols from "./_components/Symbols";

const stats = ["open", "high", "low", "close"] as const;

export default function Home() {
  return (
    <main className="min-h-screen space-y-4 p-24">
      <div className="max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex mx-auto">
        <Symbols />
      </div>
      <div className="max-w-6xl w-full items-center justify-between text-sm lg:flex mx-auto">
        <dl className="w-full mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat} tradeKey={stat} />
          ))}
        </dl>
      </div>
      <div className="max-w-6xl w-full items-center justify-between text-sm lg:flex mx-auto">
        <Graph />
      </div>
    </main>
  );
}
