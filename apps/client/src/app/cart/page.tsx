import { Suspense } from "react";
import CartContent from "./cart-content";

export default function CartPage() {
  return (
    <Suspense fallback={<p>Loading cart…</p>}>
      <CartContent />
    </Suspense>
  );
}