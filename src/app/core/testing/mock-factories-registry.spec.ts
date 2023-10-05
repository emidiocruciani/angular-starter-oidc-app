/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import { of } from "rxjs";

import { Message, MessageType } from "@app/core/message/model/message.model";
import { MessageService } from "@app/core/message/service/message.service";
import { LocalStorageRefService } from "@app/core/window/service/local-storage-ref.service";
import { ConfigService } from "@app/core/config/service/config.service";
import { SessionStorageRefService } from "@app/core/window/service/session-storage-ref.service";
import { EnvironmentService } from "@app/core/environment/service/environment.service";
import { WindowRefService } from "@app/core/window/service/window-ref.service";
import { ToastrMessageDispatcherService } from "../message/service/toastr-message-dispatcher.service";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../auth/service/authentication.service";

export const routerStubFactory = () => {
    return {
        navigateByUrl(url: string): Promise<boolean> {
            return Promise.resolve(true);
        }
    } as Router;
};

export const activatedRouteStubFactory = () => {
    return {
        queryParams: of({})
    } as ActivatedRoute;
};

export const configStubFactory = () => {
    return {
        get loginUri(): string {
            return '';
        },
        get loginSuccessRedirectUri(): string {
            return '';
        },
        get logoutRedirectUri(): string {
            return '';
        },
        get oauth2CodeCallbackUri(): string {
            return '';
        }
    } as ConfigService;
};

export const environmentStubFactory = () => {
    return {
        get authServerTokenEndpointUri(): string {
            return '';
        },
        get host(): string {
            return '';
        },
        get openidClientId(): string {
            return '';
        },
        get openidClientSecret(): string {
            return '';
        }
    } as EnvironmentService;
};


export const messengerStubFactory = () => {
    return {
        send(content: string, type: MessageType): void {}
    } as MessageService;
};

const storageStubFactory = () => {
    let store: { [key: string]: string } = {};

    return {
        clear(): void {
            store = {};
        },
        getItem(key: string): string|null {
            return store[key] ?? null;
        },
        removeItem(key: string) {
            if (store[key] ?? null) {
                delete store[key];
            }
        },
        setItem(key: string, value: string): void {
            store[key] = value;
        }
    } as Storage;
};

export const localStorageRefStubFactory = () => {
    const storage = storageStubFactory();

    return {
        get nativeLocalStorage(): Storage {
            return storage;
        }
    } as LocalStorageRefService;
};

export const sessionStorageRefStubFactory = () => {
    const storage = storageStubFactory();

    return {
        get nativeSessionStorage(): Storage {
            return storage;
        }
    } as SessionStorageRefService;
};

const locationStubFactory = () => {
    let _href = '';

    return {
        get href(): string {
            return _href;
        },
        set href(value: string) {
            _href = value;
        }
    } as Location;
};

const windowStubFactory = () => {
    const location: Location = locationStubFactory();

    return {
        get location(): Location {
            return location;
        }
    } as Window;
};

export const windowRefStubFactory = () => {
    const window = windowStubFactory();

    return {
        get nativeWindow(): Window {
            return window;
        }
    } as WindowRefService;
};

export const toastrMessageDispatcherStubFactory = () => {
    return { 
        dispatch(message: Message): void { }
    } as ToastrMessageDispatcherService;
};

export const toastrStubFactory = () => {
    return { 
        show(message: string): void { },
        info(message: string): void { },
        success(message: string): void { },
        warning(message: string): void { },
        error(message: string): void { },
    } as ToastrService;
};

export const activatedRouteSnapshotStubFactory = () => {
    return {} as ActivatedRouteSnapshot;
};
  
export const routerStateSnapshotStubFactory = () => {
    return {} as RouterStateSnapshot;
};

export const authenticationStubFactory = () => {
    return {
        isAuthenticated(): boolean {
            return false;
        }
    } as AuthenticationService;
};
