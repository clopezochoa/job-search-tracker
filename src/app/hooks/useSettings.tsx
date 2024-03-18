import { CookieSymbol, SessionContextModel, SettingsModel, createSettings } from '../providers/context';

function useSettings(settings: SettingsModel, sessionContext: SessionContextModel, cookies?: any) {
  async function postSettings(settingsData: SettingsModel) {
    const body = {key: sessionContext?.session.user?.key, settings: settingsData};
    try {
      const token = await fetch('/api/set-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const response = await token.json();
      if(response && cookies && sessionContext.session.user) {
        const setCookie = cookies[1];
        setCookie(CookieSymbol.session, JSON.stringify({
          isSession: sessionContext.session.isSession,
          user: {
            key: sessionContext.session.user.key,
            name: sessionContext.session.user.name,
            email: sessionContext.session.user.email,
            password: sessionContext.session.user.password,
            settings: createSettings(sessionContext.session.user.settings, settings)  
          }
        }), {
          path: "/",
          maxAge: 3600,
          sameSite: "strict",
        });
      } else {
        throw new Error("No jobs were found.")
      }
    } catch (error) {
      console.error(error)
    }
  }
  if(sessionContext?.session.isSession) sessionContext.updateSettings(settings);
  postSettings(settings);
}

export default useSettings