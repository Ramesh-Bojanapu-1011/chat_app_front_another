// 'use client';
import { SignIn } from '@clerk/nextjs';
// import { useEffect } from 'react';

export default function Page() {
  return (
    <div className="flex justify-center w-full h-dvh items-center">
      <SignIn />
    </div>
  );
}
