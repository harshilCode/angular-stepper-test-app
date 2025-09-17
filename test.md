Act as a repo analyst. We have a merge conflict in src/lib/cart.ts inside `calcDiscount(subtotal: number, coupon?: string)`. 
HEAD supports SAVE10 and SAVE15. Incoming branch supports only SAVE10.

Do the following WITHOUT editing files:
1) Summarize precisely what each side does (return values for SAVE10/SAVE15/undefined).
2) Find all call sites of `calcDiscount` and `calcTotal` across src/** (list file paths + line numbers + how `coupon` is supplied).
3) Identify any UI that surfaces coupons (inputs, labels, messages) and any validation that assumes SAVE10 only.
4) Predict whether unit/integration tests will fail if we accept **incoming changes** (SAVE10 only). Name the tests and why.
5) Recommend a direction: keep both SAVE10 and SAVE15 OR keep only SAVE10. Include rationale tied to callers/tests.
6) Provide a Confidence (0–100%) and explain the basis (sample size, proximity to cart code, test coverage).





propose merge inplementation
Based on your analysis, propose a merged `calcDiscount` that:
- Supports both "SAVE10" (10%) and "SAVE15" (15%).
- Is explicit, readable, and typed.
- Handles unknown coupon strings by returning 0.
- Keeps rounding deterministic (two decimals handled by the caller `calcTotal`).
Return ONLY a patch for src/lib/cart.ts that updates `calcDiscount` and, if needed, adjusts `calcTotal` comments. Include one-line comments explaining the rules. End the patch with a brief commit message and Confidence (0–100%) + rationale.







if we take incoming only what breaks:
Thought experiment: If we accept **incoming changes** (SAVE10 only) and discard SAVE15, enumerate:
- Which tests break (names + reasons)
- Which UI/validation texts become wrong
- Any analytics or pricing reports that would be impacted (search for "SAVE15" occurrences)
Provide a bullet list and a short “risk matrix” (Impact: High/Med/Low, Likelihood: High/Med/Low). 
End with a recommendation and Confidence (0–100%).


post merge sanity check
Post-merge checklist for coupons and totals:
- Re-scan for any references that still assume SAVE10 only.
- Confirm that UI copy, validation, and tests now align.
- Confirm that currency formatting and rounding remain consistent through `calcTotal`.
- Confirm no dead code/comment drift remains.
Produce a concise checklist with ✅/❌ and file paths. Include Confidence (0–100%).