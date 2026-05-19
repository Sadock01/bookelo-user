type RegisterStepIndicatorProps = {
  readonly current: number;
  readonly total: number;
};

export function RegisterStepIndicator({ current, total }: RegisterStepIndicatorProps) {
  return (
    <div className="flex items-center gap-2" aria-label={`Étape ${current} sur ${total}`}>
      {Array.from({ length: total }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;
        const isDone = stepNumber < current;

        return (
          <span
            key={stepNumber}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              isActive ? "w-8 bg-[#169283]" : isDone ? "w-4 bg-[#1ec9b6]" : "w-4 bg-[#e5e7eb]"
            }`}
          />
        );
      })}
    </div>
  );
}
