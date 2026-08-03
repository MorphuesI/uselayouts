"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

// Types

type Step = {
  title: string;
  description: string;
};

type StepperProps = {
  steps?: Step[];
  orientation?: "horizontal" | "vertical";
};

// Default demo steps

const DEFAULT_STEPS: Step[] = [
  {
    title: "Your details",
    description: "Provide your name and email address.",
  },
  {
    title: "Choose a plan",
    description: "Select the plan that works best for you.",
  },
  {
    title: "Add payment",
    description: "Enter a credit card or connect your bank.",
  },
  {
    title: "Confirmation",
    description: "Review your order and confirm your purchase.",
  },
];

// Step Circle

const StepCircle = ({
  index,
  currentStep,
  onClick,
}: {
  index: number;
  currentStep: number;
  onClick: () => void;
}) => {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;

  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
      style={{ zIndex: 1 }}
      aria-label={`Go to step ${index + 1}`}
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-700" />

      {/* Fill */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          scale: isCompleted || isActive ? 1 : 0,
          backgroundColor:
            isCompleted || isActive
              ? "#22c55e"
              : "#18181b",
        }}
        transition={{
          duration: 0.08,
          ease: "linear",
        }}
      />

      {/* Content */}
      <AnimatePresence mode="wait" initial={false}>
        {isCompleted ? (
          <motion.svg
            key="check"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.12,
            }}
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        ) : (
          <motion.span
            key={`number-${index}`}
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.7,
              opacity: 0,
            }}
            transition={{
              duration: 0.12,
            }}
            className="absolute inset-0 flex items-center justify-center tabular-nums text-[13px] font-semibold"
            style={{
              zIndex: 1,
              color: "#ffffff",
            }}
          >
            {index + 1}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

// Connector Line

const ConnectorLine = ({
  index,
  currentStep,
  orientation,
}: {
  index: number;
  currentStep: number;
  orientation: "horizontal" | "vertical";
}) => {
  const isFilled = index < currentStep;

  return (
    <div
      className="relative overflow-hidden bg-zinc-200 dark:bg-zinc-700"
      style={
        orientation === "horizontal"
          ? { flex: 1, height: "2px", margin: "0 4px" }
          : { width: "2px", height: "40px", margin: "4px 19px" }
      }
    >
      <motion.div
        className="absolute inset-0 bg-green-500"
        initial={false}
        animate={
          orientation === "horizontal"
            ? { scaleX: isFilled ? 1 : 0 }
            : { scaleY: isFilled ? 1 : 0 }
        }
        style={
          orientation === "horizontal"
            ? { transformOrigin: "left" }
            : { transformOrigin: "top" }
        }
        transition={{
          duration: 0.15,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </div>
  );
};

// Main Stepper

const Stepper = ({
  steps = DEFAULT_STEPS,
  orientation = "horizontal",
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goTo = (index: number) => {
    setCurrentStep(index);
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  // Horizontal Layout

  if (orientation === "horizontal") {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 p-6">
        {/* Indicators */}
        <div className="flex items-center w-full">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center gap-2">
                <StepCircle
                  index={i}
                  currentStep={currentStep}
                  onClick={() => goTo(i)}
                />

                <span
                  className="text-xs font-medium text-center whitespace-nowrap transition-colors duration-75"
                  style={{
                    color:
                      i <= currentStep
                        ? "#22c55e"
                        : "#a1a1aa",
                  }}
                >
                  {step.title}
                </span>
              </div>

              {i < steps.length - 1 && (
                <ConnectorLine
                  index={i}
                  currentStep={currentStep}
                  orientation="horizontal"
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden min-h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="p-6"
            >
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
                Step {currentStep + 1} —{" "}
                {steps[currentStep].title}
              </p>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {steps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <motion.button
            onClick={goBack}
            whileTap={{ scale: 0.95 }}
            disabled={currentStep === 0}
            className="px-5 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Back
          </motion.button>

          <motion.button
            onClick={goNext}
            whileTap={{ scale: 0.95 }}
            disabled={currentStep === steps.length - 1}
            className="px-5 py-2 rounded-full text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 2
              ? "Finish"
              : "Next"}
          </motion.button>
        </div>
      </div>
    );
  }

  // Vertical Layout

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-6 p-6">
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            {/* Left */}
            <div className="flex flex-col items-center">
              <StepCircle
                index={i}
                currentStep={currentStep}
                onClick={() => goTo(i)}
              />

              {i < steps.length - 1 && (
                <ConnectorLine
                  index={i}
                  currentStep={currentStep}
                  orientation="vertical"
                />
              )}
            </div>

            {/* Right */}
            <div className="pb-8 pt-1.5">
              <p
                className="text-sm font-semibold mb-0.5 transition-colors duration-75"
                style={{
                  color:
                    i <= currentStep
                      ? "#22c55e"
                      : "#a1a1aa",
                }}
              >
                {step.title}
              </p>

              <AnimatePresence>
                {i === currentStep && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="text-sm text-zinc-500 dark:text-zinc-400 overflow-hidden"
                  >
                    {step.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <motion.button
          onClick={goBack}
          whileTap={{ scale: 0.95 }}
          disabled={currentStep === 0}
          className="px-5 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Back
        </motion.button>

        <motion.button
          onClick={goNext}
          whileTap={{ scale: 0.95 }}
          disabled={currentStep === steps.length - 1}
          className="px-5 py-2 rounded-full text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {currentStep === steps.length - 2
            ? "Finish"
            : "Next"}
        </motion.button>
      </div>
    </div>
  );
};

export default Stepper;