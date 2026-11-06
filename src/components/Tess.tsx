import type { ReactNode } from "react";

/**
 * Τίτλος με την ψηφίδα ως τελεία.
 * Η ψηφίδα κολλάει στην τελευταία λέξη ώστε να μην «πέφτει» μόνη της
 * σε νέα γραμμή όταν ο τίτλος αναδιπλώνεται.
 */
export function TitleWithTess({ children }: { children: string }): ReactNode {
  const words = children.trim().split(" ");
  const last = words.pop() ?? "";
  const head = words.join(" ");

  return (
    <>
      {head ? `${head} ` : null}
      <span className="whitespace-nowrap">
        {last}
        <i className="tess" aria-hidden="true" />
      </span>
    </>
  );
}
