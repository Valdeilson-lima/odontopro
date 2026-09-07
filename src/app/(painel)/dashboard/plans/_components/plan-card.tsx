import { subscriptionPlans } from "@/utils/plans";
import { Check, Crown, Sparkles } from "lucide-react";

type Plan = (typeof subscriptionPlans)[number];

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const isFeatured = plan.tone === "featured";

  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-6 shadow-[0_18px_40px_-32px_#17483b] ${
        isFeatured
          ? "border-[#17624f] bg-[#17624f] text-white ring-4 ring-[#dceee5]"
          : "border-[#d9e8e1] bg-white text-[#12352e]"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-[#f4c7a9] px-3 py-1 text-xs font-semibold text-[#6f3821]">
          <Sparkles className="h-3.5 w-3.5" />
          Mais escolhido
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{plan.name}</h2>
          <p
            className={`mt-2 text-sm leading-5 ${
              isFeatured ? "text-[#c5ddd3]" : "text-[#71867f]"
            }`}
          >
            {plan.description}
          </p>
        </div>
        {isFeatured ? <Crown className="h-5 w-5 text-[#f4c7a9]" /> : null}
      </div>

      <div className="mt-7 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-[-0.04em]">
          {plan.price}
        </span>
        <span
          className={`text-sm ${
            isFeatured ? "text-[#c5ddd3]" : "text-[#71867f]"
          }`}
        >
          {plan.period}
        </span>
      </div>
      {"oldPrice" in plan && plan.oldPrice && (
        <p
          className={`mt-1 text-sm line-through ${
            isFeatured ? "text-[#b8d4ca]" : "text-[#8aa098]"
          }`}
        >
          De {plan.oldPrice}
        </p>
      )}

      <div
        className={`my-6 h-px ${isFeatured ? "bg-white/15" : "bg-[#e5efeb]"}`}
      />

      <ul className="flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm ${
              isFeatured ? "text-[#e2f0eb]" : "text-[#607770]"
            }`}
          >
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                isFeatured ? "text-[#f4c7a9]" : "text-[#5fa486]"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`mt-8 inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors ${
          isFeatured
            ? "bg-[#f4c7a9] text-[#6f3821] hover:bg-[#f7d6bf]"
            : "border border-[#b9d9ca] text-[#17624f] hover:bg-[#e7f2ed]"
        }`}
      >
        Escolher plano
      </button>
    </article>
  );
}
