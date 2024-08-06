"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const UserHealthFrom = () => {
  return <div>UserHealthFrom</div>;
};

export default UserHealthFrom;
