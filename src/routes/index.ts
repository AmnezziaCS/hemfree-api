import { importAccountsRoutes } from './accounts';
import { importServerRoutes } from './servers';

export const importAllRoutes = (app: any) => {
    importServerRoutes(app);
    importAccountsRoutes(app);
};
