type HeaderProps = {
  userName?: string;
};

export const Header = ({ userName = "Abhijit" }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground mt-1">Here’s a quick look at your finances.</p>
      </div>
    </div>
  );
};


