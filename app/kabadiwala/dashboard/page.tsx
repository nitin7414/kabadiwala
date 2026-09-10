"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KabadiwalaDashboardAlias() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/kabadiwala");
  }, [router]);

  return null;
}
