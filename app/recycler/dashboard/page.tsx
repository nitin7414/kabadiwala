"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RecyclerDashboardAlias() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/recycler");
  }, [router]);

  return null;
}
