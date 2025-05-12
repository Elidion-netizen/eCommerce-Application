import { type SessionHook, useSession } from '@/hooks/use-session';
import { createContext, type ReactNode, useContext } from 'react';

const SessionContext = createContext<SessionHook | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): React.JSX.Element => {
  const session = useSession();

  return <SessionContext value={session}>{children}</SessionContext>;
};

export const useAuth = (): SessionHook => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};
