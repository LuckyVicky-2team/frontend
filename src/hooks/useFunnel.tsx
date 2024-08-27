import React, { ReactElement, ReactNode, useMemo, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };
  Step.displayName = 'Step';

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(
      childStep => childStep.props.name === step
    );

    return <>{targetStep}</>;
  };
  Funnel.displayName = 'Funnel';

  const MemoizedStep = useMemo(() => Step, []);
  const MemoizedFunnel = useMemo(() => Funnel, [step]);

  return {
    Funnel: MemoizedFunnel,
    Step: MemoizedStep,
    setStep,
    currentStep: step,
  } as const;
};
