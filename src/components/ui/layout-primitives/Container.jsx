const Container = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto w-full max-w-[1800px] px-6 md:px-12 ${className}`}>
      {children}
    </div>
  )
}

export default Container