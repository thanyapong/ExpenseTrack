import { UserManager, UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";
import ReactDOM from "react-dom/client";
import { SSO_CONFIG, VITE_BASE_URL } from "./Const";
import { SigninCallback } from "./app/modules/_auth";

let returnUrl = "/";

const userManagerSettings: UserManagerSettings = {
    ...SSO_CONFIG,
    loadUserInfo: true,
    response_type: "code",
    userStore: new WebStorageStateStore({
        store: window.localStorage,
    }),
};

const oidcUserManager = new UserManager(userManagerSettings);

oidcUserManager
    .signinRedirectCallback()
    .then((user) => {
        const state = user.state as any;
        if (state) {
            if (state.returnUrl !== "/not-found") {
                returnUrl = state.returnUrl;
            }
        }

        oidcUserManager.clearStaleState();
        document.location.href = `${VITE_BASE_URL}${returnUrl}`;
    })
    .catch(() => {
        oidcUserManager.clearStaleState();
        document.location.href = `${VITE_BASE_URL}`;
    });

oidcUserManager.signinSilentCallback().catch(() => {
    oidcUserManager.clearStaleState();
    document.location.href = `${VITE_BASE_URL}`;
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<SigninCallback />);
