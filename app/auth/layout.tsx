const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (<div className="h-full flex items-center justify-center bg-gradient-to-b from-indigo-600 to-pink-600">{children}</div>);
};
export default AuthLayout