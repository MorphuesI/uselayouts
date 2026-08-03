// SWAP-FORM.TSX

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

const EASE = [0.4, 0, 0.2, 1];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M14.94 13.09c-.28.63-.61 1.21-.99 1.74-.52.74-.94 1.25-1.27 1.53-.51.47-1.05.71-1.63.72-.42 0-.92-.12-1.5-.36-.58-.24-1.12-.36-1.6-.36-.51 0-1.05.12-1.64.36-.59.24-1.07.37-1.44.38-.56.02-1.11-.23-1.65-.75-.36-.3-.8-.83-1.33-1.59C2.3 13.92 1.8 13 1.41 11.96c-.42-1.11-.63-2.19-.63-3.23 0-1.19.26-2.22.77-3.07.41-.68.95-1.22 1.63-1.62.68-.4 1.41-.6 2.2-.61.43 0 1 .13 1.71.4.71.26 1.16.4 1.36.4.15 0 .66-.16 1.52-.47.81-.29 1.5-.41 2.07-.36 1.53.12 2.68.72 3.44 1.8-1.37.83-2.05 1.99-2.04 3.48.01 1.16.43 2.13 1.27 2.88.38.36.8.64 1.27.83-.1.3-.21.58-.34.86z" />
  </svg>
);

const InputField = ({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 tracking-[-0.01em]">
        {label}
      </label>

      <motion.div
        animate={{
          boxShadow: focused
            ? "0 0 0 3px rgba(255,255,255,0.08)"
            : "0 0 0 1px rgba(0,0,0,0.08)",
        }}
        transition={{
          duration: 0.18,
          ease: EASE,
        }}
        className="rounded-xl bg-white dark:bg-zinc-900"
      >
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl bg-transparent px-3.5 py-3 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
      </motion.div>
    </div>
  );
};

const SocialButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-white shadow-sm"
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
};

const Divider = () => (
  <div className="mb-5 flex items-center gap-3">
    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />

    <span className="text-[11px] font-medium tracking-[0.06em] text-zinc-400 dark:text-zinc-500">
      OR
    </span>

    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
  </div>
);

export default function SwapForm() {
  const [mode, setMode] = useState("signup");

  return (
    <div className="relative flex h-[720px] w-full items-center justify-center overflow-hidden rounded-3xl bg-zinc-100 p-6 dark:bg-zinc-950">
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 34,
        }}
        className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white/90 dark:bg-zinc-900/90 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-2xl"
      >
        <div className="relative z-10">
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={mode}
              initial={{
                opacity: 0,
                y: -24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -24,
              }}
              transition={{
                duration: 0.28,
                ease: EASE,
              }}
            >
              <div className="mb-6">
                <h1 className="mb-1 text-[22px] font-bold tracking-[-0.03em] text-zinc-950 dark:text-white">
                  {mode === "signup"
                    ? "Create Account"
                    : "Sign In"}
                </h1>

                <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400">
                  {mode === "signup"
                    ? "Just one more step to get started!"
                    : "Hey friend, welcome back!"}
                </p>
              </div>

              <div className="mb-5 flex flex-col gap-2.5">
                <SocialButton
                  icon={<GoogleIcon />}
                  label="Continue with Google"
                />

                <SocialButton
                  icon={<AppleIcon />}
                  label="Continue with Apple"
                />
              </div>

              <Divider />

              <div className="mb-5 flex flex-col gap-3.5">
                {mode === "signup" && (
                  <InputField
                    label="Full Name"
                    type="text"
                    placeholder="Your name"
                  />
                )}

                <InputField
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                />

                {mode === "signup" && (
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                  />
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="mb-5 w-full rounded-[14px] bg-zinc-950 dark:bg-white py-3 text-sm font-semibold text-white dark:text-zinc-950"
              >
                {mode === "signup"
                  ? "Create Account"
                  : "Get Sign In Code"}
              </motion.button>

              <div className="text-center">
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                  {mode === "signup"
                    ? "Already have account?"
                    : "Don't have account?"}{" "}

                  <button
                    onClick={() =>
                      setMode((m) =>
                        m === "signup"
                          ? "signin"
                          : "signup"
                      )
                    }
                    className="font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    {mode === "signup"
                      ? "Sign In"
                      : "Create Account"}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}