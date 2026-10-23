import { baselinesQuiet, definitions, settings, timeline, type SettingId } from "./paceData";
import { bktSweep } from "./frontierData";

// All three figures are drawn from the result files named in paceData.ts / frontierData.ts. No screenshots, no invented points.

/* ------------------------------------------------------------------------------------------------
 * Figure 1. The trade-off: interventions per student against missed help, locked 2009-10 test (597 students).
 * Source: docs/aria_pace/RESULTS.md (quiet table) and aria_pace/results/test_results.json
 * (main.variants.frozen.methods.*.quiet; main.sweep.methods.bkt). Mirrors aria_pace/figures/frontier_test.png.
 * ---------------------------------------------------------------------------------------------- */
export function TradeoffFigure() {
  const W = 760;
  const H = 480;
  const m = { l: 74, r: 24, t: 22, b: 64 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const xMax = 60;
  const yMax = 2.8;
  const x = (v: number) => m.l + (v / xMax) * pw;
  const y = (v: number) => m.t + ph - (v / yMax) * ph;
  const curve = bktSweep.filter((p) => p[2] <= xMax && p[1] > 0).map((p) => `${x(p[2]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(" ");
  const xTicks = [0, 10, 20, 30, 40, 50, 60];
  const yTicks = [0, 0.5, 1, 1.5, 2, 2.5];

  const base = (key: string) => baselinesQuiet.find((b) => b.key === key)!;
  const quiet = settings[0];
  const balanced = settings[1];
  const supportive = settings[2];
  const always = base("always");

  return (
    <svg className="fig" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="fig1-t fig1-d">
      <title id="fig1-t">Trade-off between hints given and missed help</title>
      <desc id="fig1-d">
        Interventions per student against the share of stuck sequences that were never helped, on the locked test. Always helping gives 2.54
        interventions and 0% missed help. ARIA-Pace Quiet gives 1.22 and 3.7%, Balanced 2.15 and 0.2%, Supportive 2.46 and 0%. A tuned
        two-wrong-in-a-row rule gives 1.28 with 25.9% missed, a matched-rate random rule 1.22 with 33.2%, and an untuned three-wrong rule
        0.70 with 56.6%.
      </desc>
      {/* grid + axes */}
      {yTicks.map((t) => (
        <g key={`y${t}`}>
          <line className="fig__grid" x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
          <text className="fig__tick" x={m.l - 10} y={y(t) + 4} textAnchor="end">{t.toFixed(1)}</text>
        </g>
      ))}
      {xTicks.map((t) => (
        <g key={`x${t}`}>
          <line className="fig__grid fig__grid--v" x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ph} />
          <text className="fig__tick" x={x(t)} y={m.t + ph + 20} textAnchor="middle">{t}%</text>
        </g>
      ))}
      <line className="fig__axis" x1={m.l} x2={W - m.r} y1={m.t + ph} y2={m.t + ph} />
      <line className="fig__axis" x1={m.l} x2={m.l} y1={m.t} y2={m.t + ph} />
      <text className="fig__label" x={m.l + pw / 2} y={H - 14} textAnchor="middle">Missed help: stuck sequences never hinted before try 10</text>
      <text className="fig__label" transform={`translate(18 ${m.t + ph / 2}) rotate(-90)`} textAnchor="middle">Hints given per student</text>

      {/* better corner */}
      <g className="fig__better">
        <path d={`M${m.l + 34} ${m.t + ph - 34} l-22 22 m0 -14 v14 h14`} />
        <text x={m.l + 40} y={m.t + ph - 40}>better</text>
      </g>

      {/* BKT frontier from the threshold sweep */}
      <polyline className="fig__curve" points={curve} />
      <text className="fig__note" x={x(24)} y={y(0.42) - 12} textAnchor="start">ARIA-Pace threshold sweep</text>
      <text className="fig__note" x={x(24)} y={y(0.42) + 4} textAnchor="start">(test, descriptive)</text>

      {/* always-help reference */}
      <circle className="fig__pt fig__pt--ink" cx={x(always.missedPct)} cy={y(always.interventions)} r="6.5" />
      <text className="fig__pt-label" x={x(always.missedPct) + 16} y={y(always.interventions) - 10}>Always help: 2.54, 0%</text>

      {/* rule and random baselines (quiet setting) */}
      <rect className="fig__pt fig__pt--rule" x={x(base("n2").missedPct) - 6} y={y(base("n2").interventions) - 6} width="12" height="12" />
      <text className="fig__pt-label" x={x(base("n2").missedPct)} y={y(base("n2").interventions) - 14} textAnchor="middle">Two wrong in a row, tuned</text>
      <text className="fig__pt-sub" x={x(base("n2").missedPct)} y={y(base("n2").interventions) - 27} textAnchor="middle">25.9% missed</text>

      <path className="fig__pt fig__pt--ghost" d={`M${x(base("random").missedPct) - 6.5} ${y(base("random").interventions) + 6.5} l13 -13 M${x(base("random").missedPct) - 6.5} ${y(base("random").interventions) - 6.5} l13 13`} />
      <text className="fig__pt-label" x={x(base("random").missedPct)} y={y(base("random").interventions) + 28} textAnchor="middle">Random, same rate</text>
      <text className="fig__pt-sub" x={x(base("random").missedPct)} y={y(base("random").interventions) + 42} textAnchor="middle">33.2% missed</text>

      <rect className="fig__pt fig__pt--rule" x={x(base("n3").missedPct) - 6} y={y(base("n3").interventions) - 6} width="12" height="12" />
      <text className="fig__pt-label" x={x(base("n3").missedPct) - 12} y={y(base("n3").interventions) - 14} textAnchor="end">Three wrong, untuned</text>
      <text className="fig__pt-sub" x={x(base("n3").missedPct) - 12} y={y(base("n3").interventions) + 2} textAnchor="end">56.6% missed</text>

      {/* model baselines near ARIA-Pace Quiet: leader lines */}
      <circle className="fig__pt fig__pt--hollow" cx={x(base("pfa").missedPct)} cy={y(base("pfa").interventions)} r="5.5" />
      <path className="fig__leader" d={`M${x(base("pfa").missedPct) + 4} ${y(base("pfa").interventions) - 4} l26 -26`} />
      <text className="fig__pt-label" x={x(base("pfa").missedPct) + 34} y={y(base("pfa").interventions) - 32}>PFA threshold</text>

      <circle className="fig__pt fig__pt--hollow" cx={x(base("head").missedPct)} cy={y(base("head").interventions)} r="5.5" />
      <path className="fig__leader" d={`M${x(base("head").missedPct) + 6} ${y(base("head").interventions)} l30 -6`} />
      <text className="fig__pt-label" x={x(base("head").missedPct) + 40} y={y(base("head").interventions) - 4}>Risk head</text>

      {/* ARIA-Pace's three settings */}
      <circle className="fig__pt fig__pt--aria" cx={x(supportive.missedPct)} cy={y(supportive.interventions)} r="8" />
      <circle className="fig__pt fig__pt--aria" cx={x(balanced.missedPct)} cy={y(balanced.interventions)} r="8" />
      <circle className="fig__pt fig__pt--aria" cx={x(quiet.missedPct)} cy={y(quiet.interventions)} r="9" />
      <text className="fig__pt-label fig__pt-label--bold" x={x(supportive.missedPct) + 16} y={y(supportive.interventions) + 18}>Supportive: 2.46, 0%</text>
      <text className="fig__pt-label fig__pt-label--bold" x={x(balanced.missedPct) + 16} y={y(balanced.interventions) + 5}>Balanced: 2.15, 0.2%</text>
      <path className="fig__leader" d={`M${x(quiet.missedPct) - 4} ${y(quiet.interventions) + 8} l-14 22`} />
      <text className="fig__pt-label fig__pt-label--bold" x={x(quiet.missedPct) - 18} y={y(quiet.interventions) + 46} textAnchor="start">Quiet: 1.22, 3.7%</text>
      <text className="fig__pt-sub" x={x(quiet.missedPct) - 18} y={y(quiet.interventions) + 61}>52% fewer hints than always helping</text>
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Figure 2. Same student, tries 1-6. Stuck risk 15 / 25 / 46 / 70% at tries 3-6, thresholds 57 / 19 / 9%,
 * first hints at try 6 / 4 / 3. Source: docs/DEMO_RUNBOOK.md section 6 and the ARIA poster; thresholds from frozen_val.json.
 * ---------------------------------------------------------------------------------------------- */
export function TimelineFigure() {
  const W = 760;
  const H = 420;
  const m = { l: 150, r: 150, t: 56, b: 12 };
  const pw = W - m.l - m.r;
  const x = (n: number) => m.l + ((n - 0.5) / 6) * pw;
  const riskTop = 92;
  const riskH = 150;
  const y = (pct: number) => riskTop + riskH - (pct / 100) * riskH;
  const rows: SettingId[] = ["quiet", "balanced", "supportive"];
  const rowY = (i: number) => riskTop + riskH + 56 + i * 40;
  const pts = timeline.tries.filter((t) => t.risk !== null);

  return (
    <svg className="fig" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="fig2-t fig2-d">
      <title id="fig2-t">One student, six tries, three settings</title>
      <desc id="fig2-d">
        Tries 1 and 2 are right. Tries 3 to 6 are wrong, and the stuck risk is 15, 25, 46 and 70 percent. Supportive (threshold 9%) gives its
        first hint at try 3, Balanced (19%) at try 4, and Quiet (57%) at try 6.
      </desc>
      {/* answers */}
      {timeline.tries.map((t) => (
        <g key={t.n}>
          <text className="fig__tick" x={x(t.n)} y={22} textAnchor="middle">Try {t.n}</text>
          <rect className={t.answer === "right" ? "fig__chip fig__chip--right" : "fig__chip fig__chip--wrong"} x={x(t.n) - 28} y={32} width="56" height="22" rx="11" />
          <text className="fig__chip-text" x={x(t.n)} y={47} textAnchor="middle">{t.answer}</text>
        </g>
      ))}
      <text className="fig__label" x={m.l - 14} y={riskTop + riskH / 2 - 6} textAnchor="end">Stuck risk</text>
      <text className="fig__note" x={m.l - 14} y={riskTop + riskH / 2 + 10} textAnchor="end">chance of not</text>
      <text className="fig__note" x={m.l - 14} y={riskTop + riskH / 2 + 24} textAnchor="end">mastering by try 10</text>

      {/* thresholds */}
      {[0, 25, 50, 75, 100].map((p) => (
        <line key={p} className="fig__grid" x1={m.l} x2={W - m.r} y1={y(p)} y2={y(p)} />
      ))}
      {settings.map((s) => (
        <g key={s.id}>
          <line className="fig__thr" x1={m.l} x2={W - m.r + 8} y1={y(s.threshold)} y2={y(s.threshold)} />
          <text className="fig__pt-label" x={W - m.r + 14} y={y(s.threshold) + 4}>{s.name} {s.threshold}%</text>
        </g>
      ))}
      <text className="fig__note" x={m.l + 8} y={y(40)}>Correct steps: no hint needed</text>

      {/* risk line */}
      <polyline className="fig__curve fig__curve--risk" points={pts.map((t) => `${x(t.n)},${y(t.risk!)}`).join(" ")} />
      {pts.map((t) => (
        <g key={t.n}>
          <circle className="fig__pt fig__pt--ink" cx={x(t.n)} cy={y(t.risk!)} r="5.5" />
          <text className="fig__pt-label fig__pt-label--bold" x={x(t.n)} y={y(t.risk!) - 12} textAnchor="middle">{t.risk}%</text>
        </g>
      ))}

      {/* first hints */}
      {rows.map((id, i) => {
        const s = settings.find((q) => q.id === id)!;
        const first = timeline.firstHint[id];
        return (
          <g key={id}>
            <text className="fig__label" x={m.l - 14} y={rowY(i) + 4} textAnchor="end">{s.name}</text>
            <line className="fig__grid" x1={m.l} x2={W - m.r} y1={rowY(i)} y2={rowY(i)} />
            {timeline.tries.filter((t) => t.n >= 3).map((t) => {
              if (t.n < first) return <circle key={t.n} className="fig__wait" cx={x(t.n)} cy={rowY(i)} r="5" />;
              if (t.n === first) return <circle key={t.n} className="fig__pt fig__pt--aria" cx={x(t.n)} cy={rowY(i)} r="9" />;
              return <circle key={t.n} className="fig__later" cx={x(t.n)} cy={rowY(i)} r="3.5" />;
            })}
            <text className="fig__pt-label" x={x(first)} y={rowY(i) + 26} textAnchor="middle">first hint</text>
          </g>
        );
      })}
      <text className="fig__note" x={W - m.r + 14} y={rowY(0) + 4}>open dot: waits</text>
      <text className="fig__note" x={W - m.r + 14} y={rowY(1) + 4}>small dot: later hint</text>
      <text className="fig__note" x={W - m.r + 14} y={rowY(2) + 4}>(not counted in results)</text>
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Figure 3. Mastery-definition sensitivity. Quiet-setting saving versus always-help, five-fold cross-validated, BKT only,
 * validation students only, exploratory. Source: aria_pace/RESULTS_v4.md (Step 2, A7 table, lines 13-27).
 * ---------------------------------------------------------------------------------------------- */
export function SensitivityFigure() {
  const W = 760;
  const rowH = 58;
  const m = { l: 292, r: 150, t: 40, b: 46 };
  const H = m.t + rowH * definitions.length + m.b;
  const pw = W - m.l - m.r;
  const xMax = 70;
  const x = (v: number) => m.l + (v / xMax) * pw;
  const ticks = [0, 10, 20, 30, 40, 50, 60, 70];

  return (
    <svg className="fig" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="fig3-t fig3-d">
      <title id="fig3-t">Quiet-setting saving under five mastery definitions</title>
      <desc id="fig3-d">
        Cross-validated, exploratory. Saving versus always helping: 50.1% for three correct in a row within ten tries, 8.3% for four in a row,
        26.4% for five in a row within fifteen, 41.6% for five in a row within twenty, and 7.1% for a running-average rule.
      </desc>
      {ticks.map((t) => (
        <g key={t}>
          <line className="fig__grid fig__grid--v" x1={x(t)} x2={x(t)} y1={m.t - 8} y2={m.t + rowH * definitions.length} />
          <text className="fig__tick" x={x(t)} y={m.t + rowH * definitions.length + 20} textAnchor="middle">{t}%</text>
        </g>
      ))}
      <text className="fig__label" x={m.l + pw / 2} y={H - 8} textAnchor="middle">Fewer hints than helping after every wrong step (Quiet)</text>
      <text className="fig__note" x={W - m.r + 14} y={m.t - 16}>Missed help</text>
      {definitions.map((d, i) => {
        const cy = m.t + i * rowH + rowH / 2;
        const head = i === 0;
        return (
          <g key={d.key}>
            <text className="fig__pt-label fig__pt-label--bold" x={m.l - 14} y={cy - 4} textAnchor="end">{d.key === "DEMA" ? "Running average" : d.key === "D3" ? "3 in a row, 10 tries" : d.key === "D4" ? "4 in a row, 10 tries" : d.key === "D5T15" ? "5 in a row, 15 tries" : "5 in a row, 20 tries"}</text>
            <text className="fig__note" x={m.l - 14} y={cy + 12} textAnchor="end">{head ? "the definition used for the headline" : d.key === "DEMA" ? "average ≥ 80% for 3 tries, 10 tries" : "stricter than the headline rule"}</text>
            <rect className={head ? "fig__bar fig__bar--head" : "fig__bar"} x={m.l} y={cy - 12} width={x(d.saving) - m.l} height="24" rx="3" />
            <line className="fig__whisker" x1={x(d.lo)} x2={x(d.hi)} y1={cy} y2={cy} />
            <line className="fig__whisker" x1={x(d.lo)} x2={x(d.lo)} y1={cy - 6} y2={cy + 6} />
            <line className="fig__whisker" x1={x(d.hi)} x2={x(d.hi)} y1={cy - 6} y2={cy + 6} />
            <text className="fig__pt-label fig__pt-label--bold" x={x(d.hi) + 10} y={cy + 4}>{d.saving}%</text>
            <text className="fig__pt-label" x={W - m.r + 14} y={cy + 4}>{d.missed}</text>
          </g>
        );
      })}
    </svg>
  );
}
