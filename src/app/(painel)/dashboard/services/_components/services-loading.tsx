export default function ServicesLoading() {
  return (
    <section
      className="w-full"
      aria-busy="true"
      aria-label="Carregando serviços"
    >
      <div className="mb-7 overflow-hidden rounded-xl border border-[#d9e8e1] bg-white shadow-[0_18px_45px_-35px_#17483b]">
        <div className="flex flex-col gap-4 px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="h-3 w-32 animate-pulse rounded bg-[#dceee5]" />
            <div className="h-8 w-48 animate-pulse rounded bg-[#e5efeb]" />
            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-[#edf3f0]" />
          </div>
          <div className="h-10 w-full animate-pulse rounded-lg bg-[#dceee5] md:w-44" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-[#d9e8e1] bg-white p-5 shadow-[0_14px_35px_-30px_#17483b]"
          >
            <div className="space-y-3">
              <div className="h-6 w-3/5 animate-pulse rounded bg-[#e5efeb]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#edf3f0]" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-[#edf3f0]" />
            </div>
            <div className="mt-6 h-16 animate-pulse rounded-xl bg-[#f4f8f6]" />
            <div className="mt-4 space-y-2">
              <div className="h-3 w-32 animate-pulse rounded bg-[#edf3f0]" />
              <div className="h-3 w-36 animate-pulse rounded bg-[#edf3f0]" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="h-9 animate-pulse rounded-lg bg-[#e5efeb]" />
              <div className="h-9 animate-pulse rounded-lg bg-[#f4e4df]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
