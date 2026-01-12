import { ImSpinner2 } from 'react-icons/im';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-nunito-regular transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wellness-rose disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-wellness-rose text-white hover:bg-rose-gold-700 active:bg-rose-gold-800',
    secondary: 'bg-white text-wellness-dark border-2 border-wellness-rose hover:bg-wellness-blush active:bg-rose-gold-100',
    outline: 'bg-transparent text-wellness-rose border-2 border-wellness-rose hover:bg-wellness-blush active:bg-rose-gold-100',
    ghost: 'bg-transparent text-wellness-rose hover:bg-wellness-blush active:bg-rose-gold-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading && (
        <ImSpinner2 className="w-5 h-5 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
