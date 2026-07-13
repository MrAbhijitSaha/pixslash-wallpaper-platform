import { swatches } from "@/lib/homeSwatches";

const HomeFloatingElements = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
      aria-hidden>
      {swatches.map((s) => (
        <div
          key={s.id}
          className={`absolute ${s.position}`}>
          <div
            className={`animate-float relative h-full w-full overflow-hidden will-change-transform motion-reduce:animate-none ${s.gradient} ${s.delay} ${s.duration} shadow-2xl ring-1 shadow-black/20 ring-black/5 dark:shadow-black/50 dark:ring-white/10 ${
              s.kind === "phone" ? "rounded-[2rem]" : "rounded-xl"
            } ${s.faded ? "opacity-40 blur-[1.5px]" : "opacity-90"}`}>
            {s.kind === "desktop" ?
              <div className="absolute top-2.5 left-3 flex gap-1">
                <span className="size-1.5 rounded-full bg-white/30"></span>
                <span className="size-1.5 rounded-full bg-white/30"></span>
                <span className="size-1.5 rounded-full bg-white/30"></span>
              </div>
            : <div className="absolute inset-x-0 top-2.5 mx-auto h-1 w-8 rounded-full bg-white/25"></div>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFloatingElements;
