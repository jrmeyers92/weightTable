"use client";

import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { completeOnboarding } from "./_actions";

// id        String    @id @default(cuid())
// email     String    @unique
// clerkId   String
// birthdate DateTime?
// firstName String?
// lastName  String?

const formSchema = z.object({
  email: z.string().email(),
  clerkId: z.string(),
  birthdate: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export default function OnboardingComponent() {
  const [error, setError] = React.useState("");
  const router = useRouter();
  const { userId } = useAuth();

  if (!userId) {
    router.push("/sign-in");
  }

  const handleSubmit = async (formData: FormData) => {
    // const res = await completeOnboarding(formData);
    // if (res?.message) {
    //   // Reloads the user's data from Clerk's API
    //   await user?.reload();
    //   router.push("/");
    // }
    // if (res?.error) {
    //   setError(res?.error);
    // }
  };
  return (
    <div className="flex w-full container items-center justify-center">
      <h1>Welcome</h1>
      <form action={handleSubmit}>
        <div>
          <label>Application Name</label>
          <p>Enter the name of your application.</p>
          <input type="text" name="applicationName" required />
        </div>

        <div>
          <label>Application Type</label>
          <p>Describe the type of your application.</p>
          <input type="text" name="applicationType" required />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
