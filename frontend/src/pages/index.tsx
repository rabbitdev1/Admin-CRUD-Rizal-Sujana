import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Welcome&nbsp;</span>
          <span className={title({ color: "violet" })}>Admin&nbsp;</span>
          <br />
          <span className={title()}>
            Manage your e-commerce data efficiently.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Input, update, and monitor your products and transactions in one
            place.
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
