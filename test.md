You are a senior release engineer. In THIS repository, generate two bash scripts that will *create realistic merge conflicts* for a 10–15 minute demo, without breaking my repo permanently.

## What I want
- Script 1: scripts/setup_conflicts.sh
  - Idempotent, safe, and chatty (echo steps).
  - Creates two branches from current main (or default): 
    - A = feature-tiered-discount 
    - B = feature-free-shipping
  - Introduces **three conflicts**:
    1) **Business-logic conflict** in my cart/total logic file:
       - Branch A adds tiered coupons: SAVE10 = 10%, SAVE15 = 15%.
       - Branch B keeps SAVE10 = 10% and adds shipping rule: $0 if subtotal >= 50, otherwise $5.
       - Both branches compute and export `{ subtotal, discount, shipping, total }` (TypeScript object).
       - Include/update **unit tests** (Vitest) on each branch so the final merge requires reconciling test expectations.
    2) **UI component conflict** in my checkout button component:
       - Branch A renames the handler prop from `onCheckout` → `onSubmitOrder` and updates all internal references.
       - Branch B changes the button label to **"Pay now"** but keeps the old prop name.
       - Ensure there’s at least one usage site (e.g., in App or a container) so the rename causes a cascading change.
    3) **Dependency version conflict** in package.json:
       - Branch A sets `react-router-dom` to **6.26.0**
       - Branch B sets `react-router-dom` to **6.23.1**
       - Stage the appropriate lockfile if present.

- Script 2: scripts/reset_demo.sh
  - Resets the repo back to a clean baseline tag (e.g., v0) or, if no tag, creates one from the current clean state before changes.
  - Deletes the demo branches if they exist.
  - Chatty output.

## Repository detection & fallbacks
Before writing the scripts, scan the repo and *auto-detect* likely file paths. If uncertain, use these **fallbacks** but inline them as configurable variables at the top of the script so I can change them:
- CART_LOGIC_FILE (default: src/lib/cart.ts)
- CART_TEST_FILE (default: src/lib/__tests__/cart.test.ts)
- CHECKOUT_BUTTON_FILE (default: src/components/CheckoutButton.tsx)
- CHECKOUT_BUTTON_USAGE_FILE (default: src/App.tsx)
- BASELINE_TAG (default: v0)

If a file doesn’t exist, create it minimally and guard with comments so I can adjust later.

## Script requirements
- **Safety**:
  - Exit on error (`set -euo pipefail`).
  - Check for a clean working tree before making changes; abort if dirty (print a helpful message).
  - If BASELINE_TAG doesn’t exist, create it from the current HEAD before mutating anything so I can reset easily.
  - Back up any files you overwrite to `*.backup.<timestamp>` if they already exist and are not tracked in git.

- **Git flow**:
  - Start from default branch (prefer `main`, else `master`; detect automatically).
  - Ensure the default branch has the baseline tag (`v0` or configured).
  - Create/change files per-branch and commit with clear messages:
    - A: “feat(A): tiered discounts + prop rename”
    - B: “feat(B): free shipping + label change”
    - A/B: “chore(A/B): bump react-router-dom to <version>”
  - Print next steps at the end:
    1) `git checkout feature-tiered-discount && git merge feature-free-shipping`
    2) Open conflicted files
    3) Run tests

- **Business logic code** (TypeScript):
  - Export types: `Item { id: string; name: string; price: number; qty: number }`
  - Provide functions: 
    - `calcSubtotal(items: Item[]): number`
    - `calcDiscount(subtotal: number, coupon?: string): number`
    - `calcShipping(subtotal: number): number`
    - `calcTotal(items: Item[], coupon?: string): { subtotal: number; discount: number; shipping: number; total: number }`
  - Keep math to two decimals and deterministic.

- **Unit tests** (Vitest):
  - On A: include tests covering SAVE15 at 15% and shipping threshold behavior.
  - On B: include tests covering SAVE10 at 10% and shipping threshold behavior.
  - After merging, these will need reconciliation.

- **UI component** (React TSX):
  - The checkout button component must export a named component: `CheckoutButton`.
  - Branch A prop name: `{ onSubmitOrder: () => void; disabled?: boolean }`, label text “Checkout”.
  - Branch B prop name: `{ onCheckout: () => void; disabled?: boolean }`, label text “Pay now”.
  - Ensure `CHECKOUT_BUTTON_USAGE_FILE` renders the button with whichever prop exists on that branch so the merge produces a conflict in both the component and the usage.

- **Dependency conflict**:
  - Modify package.json and add the lockfile if present (`package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`) on each branch accordingly.
  - Do NOT run the dev server; keep scripts quick.

- **Idempotency**:
  - If branches already exist, recreate them from baseline.
  - If files already contain the intended content, skip re-writing.

- **Ergonomics**:
  - At the top of `setup_conflicts.sh`, declare and echo the configurable variables:
    - DEFAULT_BRANCH
    - BASELINE_TAG
    - CART_LOGIC_FILE
    - CART_TEST_FILE
    - CHECKOUT_BUTTON_FILE
    - CHECKOUT_BUTTON_USAGE_FILE
  - Print a summary table of what got created/modified and where to look for conflicts.

## Deliverables
1) Create/overwrite: `scripts/setup_conflicts.sh` and `scripts/reset_demo.sh` with executable shebangs.
2) Ensure both scripts are formatted, commented (what/why), and runnable as:
   - `bash scripts/setup_conflicts.sh`
   - `bash scripts/reset_demo.sh`

After generating the scripts, show me their full contents in code blocks. Do not run them.