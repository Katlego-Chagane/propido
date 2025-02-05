interface StepIndicatorProps {
  currentStep: number
  steps: { number: number; title: string }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step.number
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= step.number
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-px w-16 mx-2 ${
                currentStep > step.number ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

