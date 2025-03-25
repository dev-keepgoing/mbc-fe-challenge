const EmailInput: React.FC = () => {

  return (
    <div>
        <label htmlFor="email">Email</label>
      <input
      type='email'
      required
      pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
      title="Email must match format: neysha@mbc.com"
      />
    </div>
  );
};

export default EmailInput;