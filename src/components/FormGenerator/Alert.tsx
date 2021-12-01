const Alert = ({ children }: { children: string }) => (
  <div className="alert alert-error">
    {children}
  </div>
);

export default Alert;
