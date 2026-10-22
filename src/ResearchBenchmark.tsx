export default function ResearchBenchmark() {
  return (
    <section className="methodology-section" aria-labelledby="benchmark-title">
      <p className="kicker">Development benchmark</p>
      <h2 id="benchmark-title">Language classification under stress.</h2>
      <p>
        These numbers describe the language classifier on synthetic examples. The demo’s decision
        to step in after a wrong step comes from the math checker and the timing model, not these
        labels; the labels can only add optional flags that need an explicit feeling word.
      </p>
      <div className="methodology-table-wrap">
        <table>
          <thead><tr><th scope="col">Check</th><th scope="col">Result</th><th scope="col">Interpretation</th></tr></thead>
          <tbody>
            <tr><th scope="row">Same-generator accuracy</th><td>84.6%</td><td>350 held-out synthetic messages; no independent human ground truth.</td></tr>
            <tr><th scope="row">Macro-F1</th><td>0.837</td><td>Each of the seven legacy states receives equal weight.</td></tr>
            <tr><th scope="row">Cross-generator gap</th><td>9.05 percentage points</td><td>Mean decrease when different models generate the language.</td></tr>
            <tr><th scope="row">Independent human labels</th><td>Pending</td><td>Real student language still needs independent annotation.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
