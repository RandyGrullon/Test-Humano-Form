"use client";

import FormularioRegistro from "@/components/FormularioRegistro";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegistroPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (user) {
    return null;
  }
  return <FormularioRegistro />;
}
