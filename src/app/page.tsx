"use client";

import WeightInputs from "@/components/WeightInputs";
import WeightTable from "@/components/WeightTable";
import { WeightProvider } from "@/context/WeightContext";
export default function Home() {
  return (
    <main className="py-4">
      <WeightProvider>
        <div className="container my-6">
          <WeightInputs />
          <WeightTable />
        </div>
      </WeightProvider>
    </main>
  );
}
