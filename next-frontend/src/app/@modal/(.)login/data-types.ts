export const loginSteps = [
  {
    step: 1,
    title: "Step One",
    description: "Login Account",
  },
  {
    step: 2,
    title: "Step Two",
    description: "Verification",
  },
];
export type LoginDetails = {
  id: string;
  password: string;
  remember: boolean;
  verificationCode: string;
};
