"use client";

import WeightInputs from "@/components/WeightInputs";
import WeightTable from "@/components/WeightTable";
import { WeightProvider } from "@/context/WeightContext";
export default function Home() {
  return (
    <main className="py-4 container">
      <WeightProvider>
        <WeightInputs />
        <WeightTable />
      </WeightProvider>
    </main>
  );
}
