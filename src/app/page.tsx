"use client";

import UserHealthFrom from "@/components/forms/UserHealthFrom";
import WeightInputs from "@/components/WeightInputs";
import WeightTable from "@/components/WeightTable";
import { WeightProvider } from "@/context/WeightContext";
export default function Home() {
  return (
    <main className="py-4">
      <WeightProvider>
        <div className="container my-6">
          <WeightInputs />
          <UserHealthFrom />
          <WeightTable />
        </div>
      </WeightProvider>
    </main>
  );
}
