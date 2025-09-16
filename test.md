You are a senior frontend engineer. Please generate a minimal but realistic **Shopping Cart / Checkout** demo app using **React + TypeScript + Tailwind CSS + Vite + Vitest + React Testing Library**.

### Goals
- Small, readable codebase suitable for a live demo (10–15 min).
- Include **UI + business logic + tests** so I can later demonstrate merge conflicts.
- Keep dependencies lightweight: React, TypeScript, Vite, Tailwind, Vitest, @testing-library/*.

### Project Setup (automate via instructions in README)
1) Initialize Vite React TypeScript app.
2) Configure Tailwind (postcss.config, tailwind.config, global index.css with @tailwind base/components/utilities).
3) Add Vitest + RTL + jsdom and set up `vite.config.ts` test env.
4) Add ESLint + Prettier config (recommended defaults).
5) Provide npm scripts: dev, build, preview, test, test:watch, lint, format.

### App Concept
A tiny cart with:
- **Item list** (2–4 hardcoded products).
- **Cart panel** showing line items, qty, subtotal.
- **Coupon input** (supports “SAVE10” for 10% off).
- **Shipping rule** (flat $5 shipping if subtotal < $50, else $0).
- **Checkout button** (calls a mock API or alert).
- Accessible, keyboard-navigable UI.

### File Structure (create these files with full code)
- `src/lib/cart.ts`
  - Types: `Item { id, name, price, qty }`, `CartLine`.
  - Functions:
    - `calcSubtotal(items: Item[]): number`
    - `calcDiscount(subtotal: number, coupon?: string): number`  // supports "SAVE10"
    - `calcShipping(subtotal: number): number` // $0 if >= 50, else 5
    - `calcTotal(items: Item[], coupon?: string): { subtotal, discount, shipping, total }`
- `src/lib/__tests__/cart.test.ts` (Vitest):
  - Test discount for SAVE10.
  - Test shipping threshold at 49.99 vs 50.
  - Test combined total math and rounding.
- `src/components/ProductList.tsx`
  - Props: `products: Item[]`, `onAdd(item: Item)`
  - Renders product cards with “Add to cart”.
  - A11y: proper button labels and roles.
- `src/components/CartPanel.tsx`
  - Props: `items: Item[]`, `onChangeQty(id, qty)`, `onRemove(id)`, `coupon`, `onCouponChange`
  - Shows line items, per-line subtotal, subtotal/discount/shipping/total summary (uses lib functions).
  - Validates coupon on the fly (simple hint text).
- `src/components/CheckoutButton.tsx`
  - Props: `{ onCheckout: () => void; disabled?: boolean }`
  - Button text “Checkout”.
  - aria-label="Checkout"
- `src/App.tsx`
  - Holds state: `items`, `cart` (array of items with qty), `coupon`.
  - Preloads **2–4 products** (e.g., “T-Shirt $20”, “Mug $15”…).
  - Integrates `ProductList`, `CartPanel`, `CheckoutButton`.
  - `onCheckout` triggers a mock API call (Promise timeout) and shows success/failure toast or alert.
- `src/styles/tokens.css` (optional): basic Tailwind utilities or custom classes for spacing/typography (keep it minimal).
- `src/index.css`: Tailwind directives, base styles.
- `README.md`:
  - Clear setup steps (npm i / npm run dev).
  - How to run tests.
  - Brief architecture notes.

### Tailwind Styling
- Use simple, readable Tailwind classes (container, grid, gap, rounded, shadow, focus-visible).
- Ensure buttons have focus styles and sufficient color contrast.

### Testing Requirements
- Unit tests for `cart.ts` math (edge cases: empty cart, big numbers, rounding).
- Component tests (RTL):
  - `ProductList` renders items and fires `onAdd`.
  - `CartPanel` updates totals when qty changes; shows discount when coupon SAVE10 is entered; shows shipping correctly below/above $50.
  - `CheckoutButton` calls handler and respects `disabled`.
- Keep tests fast and deterministic, no network.

### Accessibility
- Labels for inputs (coupon input with <label>).
- Buttons with `aria-label` where text may be ambiguous.
- Keyboard focus rings visible.

### Nice-to-Have (if time permits)
- Utility currency formatter.
- Basic empty-state messages for the cart.
- A small toast helper for checkout success.

### Output Format
- Please generate:
  1) All source files with complete code (TypeScript).
  2) Tailwind/PostCSS/Vite/Vitest config files.
  3) A README with setup, run, and test instructions.
- Use clear comments (1–2 lines) at top of each file describing its purpose.

### Acceptance Criteria
- `npm run dev` starts the app and shows product list + cart panel.
- Entering `SAVE10` visibly reduces the total by 10%.
- Shipping switches from $5 to $0 at subtotal >= $50.
- `npm test` passes with unit and component tests.
- Code is small, clean, and ready for a live demo.