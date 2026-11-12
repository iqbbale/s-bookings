"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardLoadingLogin() {
  return (
    <Card>
      <CardHeader>
        {/* Pengganti CardTitle */}
        <Skeleton className="h-6 w-44" />
        {/* Pengganti CardDescription */}
        <Skeleton className="h-4 w-66 mt-1" />
        {/* Pengganti CardAction (Tombol Sign Up) */}
        <CardAction>
          <Skeleton className="h-5 w-14" />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="fles flex-col gap-6">
          {/* Field Email */}
          <div className="grid gap-2">
            {/* Pengganti Label Email */}
            <Skeleton className="h-4 w-12" />
            {/* Pengganti Input Email (tinggi standar input shadcn h-9 / h-10) */}
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          {/* Field Password */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              {/* Pengganti Label Password */}
              <Skeleton className="H-4 W-16" />
              {/* Pengganti Link Forgot Password */}
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* Pengganti Button Login */}
        <Skeleton className="h-9 w-full rounded-md" />
        {/* Pengganti Button Login with Google */}
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
