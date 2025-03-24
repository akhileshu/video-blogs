"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { Button } from "@/components/app/button";
import SubmitButton from "@/components/app/SubmitButton";

export default function SubmitButtonTest() {
  const [isPending, setIsPending] = useState(false);

  const simulateRequest = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
    }, 2000); // simulate 2 seconds request
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">SubmitButton Test Cases</h2>

      <Button onClick={simulateRequest} disabled={isPending}>
        Simulate Request
      </Button>

      {/* 1. Only text */}
      <SubmitButton text="Submit" isPending={isPending} />

      {/* 2. Only icon */}
      <SubmitButton icon={<Save />} isPending={isPending} />

      {/* 3. Icon + text */}
      <SubmitButton text="Save" icon={<Save />} isPending={isPending} />

      {/* 4. Pending state with pendingText */}
      <SubmitButton
        text="Submit"
        pendingText="Submitting..."
        isPending={isPending}
      />

      {/* 5. Pending state without pendingText */}
      <SubmitButton text="Submit" isPending={isPending} />

      {/* 6. Icon + text with pending state */}
      <SubmitButton
        text="Save"
        icon={<Save />}
        pendingText="Saving..."
        isPending={isPending}
      />

      {/* 7. Icon only with pending state */}
      <SubmitButton
        icon={<Save />}
        pendingText="Loading..."
        isPending={isPending}
      />

      {/* 8. Custom styled */}
      <SubmitButton
        text="Styled Button"
        icon={<Check />}
        className="bg-green-600 hover:bg-green-700 text-white"
        isPending={isPending}
      />
    </div>
  );
}
