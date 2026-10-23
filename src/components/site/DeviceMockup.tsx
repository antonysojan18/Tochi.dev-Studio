import {
  Command,
  Search,
  LayoutDashboard,
  Files,
  Activity,
  Settings2,
  ArrowUpRight,
  Check,
  PanelLeft,
} from "lucide-react";

const navigation = ["Overview", "Workspace", "Activity", "Settings"];

export function DeviceMockup({
  title,
  index,
  image,
  url,
}: {
  title: string;
  index: number;
  image?: string;
  url?: string;
}) {
  const isPhone = !image && index === 2;
  const displayUrl = url
    ? url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${title.toLowerCase().replace(/\s+/g, "")}.com`;

  return (
    <div
      className="device-stage relative flex aspect-[16/11] items-center justify-center overflow-hidden rounded-xl p-2 sm:p-3 md:p-4"
      aria-label={`${title} ${isPhone ? "desktop and mobile" : "MacBook"} concept mockup`}
    >
      <div className={`device-laptop relative w-[96%] ${isPhone ? "device-with-phone" : ""}`}>
        <div className="device-screen overflow-hidden rounded-t-xl rounded-b-md border-[4px] sm:border-[5px] border-device-rim bg-device-surface shadow-device">
          <div className="device-menubar flex h-4 sm:h-5 items-center justify-between px-2.5 sm:px-3 text-[7px] font-medium text-device-ink">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Command className="size-2" /> {title}
              <span className="hidden sm:inline">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View</span>
            </span>
            <span className="text-[6px] sm:text-[7px] text-device-muted">Studio preview</span>
          </div>
          <div className="flex h-6 sm:h-7 items-center gap-1 border-b border-device-line bg-device-toolbar px-2">
            <span className="device-dot bg-device-close" />
            <span className="device-dot bg-amber" />
            <span className="device-dot bg-emerald" />
            <div className="mx-auto flex w-[62%] items-center justify-center gap-1 rounded border border-device-line bg-device-surface py-0.5 px-1.5 text-[7px] text-device-muted">
              <Search className="size-2 shrink-0" />
              <span className="truncate">{displayUrl}</span>
            </div>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${url}`}
                className="text-device-muted hover:text-device-ink transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="size-2.5 text-device-accent" />
              </a>
            ) : (
              <PanelLeft className="size-2.5 text-device-muted" />
            )}
          </div>
          {image ? (
            <div className="group/screen relative aspect-[16/8] sm:aspect-[16/7.8] w-full overflow-hidden bg-device-toolbar">
              <img
                src={image}
                alt={`${title} interface preview`}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/screen:scale-[1.03]"
                loading="lazy"
              />
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/screen:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-background/95 px-3.5 py-1.5 font-mono text-[11px] font-medium text-foreground shadow-2xl transition-transform hover:scale-105">
                    Visit {displayUrl} <ArrowUpRight className="size-3 text-device-accent" />
                  </span>
                </a>
              )}
            </div>
          ) : (
          <div className="grid min-h-[140px] sm:min-h-[180px] grid-cols-[25%_1fr] md:min-h-[230px]">
            <aside className="border-r border-device-line bg-device-toolbar p-2 md:p-3">
              <div className="mb-4 flex items-center gap-1.5 text-[9px] font-semibold text-device-ink">
                <span className="flex size-4 items-center justify-center rounded bg-device-accent text-device-accent-ink">
                  {title[0]}
                </span>
                <span className="truncate">{title}</span>
              </div>
              <div className="space-y-1">
                {navigation.map((item, i) => {
                  const Icon = [LayoutDashboard, Files, Activity, Settings2][i];
                  return (
                    <div
                      key={item}
                      className={`flex items-center gap-1.5 rounded px-1.5 py-1.5 text-[7px] md:text-[8px] ${i === 0 ? "bg-device-selection text-device-accent" : "text-device-muted"}`}
                    >
                      {Icon && <Icon className="size-2.5 shrink-0" />}
                      <span className="truncate">{item}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 border-t border-device-line pt-2 text-[6px] text-device-muted">
                WORKSPACE / PRODUCTION
              </div>
            </aside>
            <div className="min-w-0 p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[6px] text-device-muted">Workspace / Overview</p>
                  <h4 className="mt-1 text-[11px] font-semibold text-device-ink md:text-sm">
                    {index === 1
                      ? "Document intelligence"
                      : index === 2
                        ? "Fleet overview"
                        : index === 3
                          ? "Store overview"
                          : "Financial overview"}
                  </h4>
                </div>
                <ArrowUpRight className="size-3 text-device-accent" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 border-y border-device-line py-2">
                {(index === 1
                  ? ["Indexed", "Processing", "Validated"]
                  : index === 2
                    ? ["Active fleet", "In transit", "Delivered"]
                    : index === 3
                      ? ["Revenue", "Orders", "Customers"]
                      : ["Cash flow", "Receivables", "Reconciled"]
                ).map((label, i) => (
                  <div key={label}>
                    <div className="truncate text-[6px] text-device-muted">{label}</div>
                    <div className="mt-1 h-1.5 w-2/3 rounded bg-device-ink/70" />
                    <div className="mt-1 text-[6px] text-device-accent">
                      {i === 2 ? "Up to date" : "Live activity"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[7px] font-medium text-device-ink">
                <span>{index === 1 ? "Processing activity" : "Performance"}</span>
                <span className="text-[6px] text-device-muted">This month</span>
              </div>
              <div className="device-chart relative mt-2 flex h-16 items-end gap-1 border-b border-device-line pb-1 md:h-20">
                {[25, 42, 34, 58, 45, 66, 54, 78, 64, 88, 74, 96].map((height, i) => (
                  <div
                    key={i}
                    className="device-bar flex-1 rounded-t-sm bg-device-accent/70"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-b border-device-line pb-1 text-[7px] text-device-ink">
                <span>Recent activity</span>
                <span className="text-device-muted">View all</span>
              </div>
              {["Workspace synced", "Report ready"].map((label) => (
                <div
                  key={label}
                  className="mt-1.5 flex items-center gap-1 text-[6px] text-device-muted"
                >
                  <Check className="size-2 text-device-accent" />
                  <span>{label}</span>
                  <span className="ml-auto">Completed</span>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
        <div className="device-base relative mx-auto h-3 w-[108%] -translate-x-[4%] rounded-b-xl">
          <div className="device-notch mx-auto h-1 w-[16%] rounded-b" />
        </div>
      </div>
      {isPhone && (
        <div className="device-phone absolute bottom-[5%] right-[4%] w-[22%] overflow-hidden rounded-[1.2rem] border-[4px] border-device-rim bg-device-surface px-2 pb-3 pt-4 shadow-device">
          <div className="device-island absolute left-1/2 top-1 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-device-rim" />
          <div className="text-[7px] font-semibold text-device-ink">Fleetdeck</div>
          <p className="mt-2 text-[6px] text-device-muted">Live route</p>
          <div className="device-map relative my-2 aspect-square overflow-hidden rounded-md">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M12 80 L28 80 L28 35 L66 35 L66 15 L86 15"
                fill="none"
                stroke="var(--device-accent)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="80" r="5" fill="var(--device-accent)" />
              <circle cx="86" cy="15" r="5" fill="var(--device-accent)" />
            </svg>
          </div>
          <div className="text-[6px] text-device-accent">● On schedule</div>
          <div className="mt-3 mx-auto h-0.5 w-1/2 rounded-full bg-device-ink/40" />
        </div>
      )}
    </div>
  );
}
