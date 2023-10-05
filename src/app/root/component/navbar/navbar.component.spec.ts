import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfigService } from '@app/core/config/service/config.service';
import { LocalStorageRefService } from '@app/core/window/service/local-storage-ref.service';
import { NavbarComponent } from './navbar.component';
import { configStubFactory, localStorageRefStubFactory } from '@app/core/testing/mock-factories-registry.spec';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let config: ConfigService;
  let localStorageRef: LocalStorageRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: ConfigService, useFactory: configStubFactory },
        { provide: LocalStorageRefService, useFactory: localStorageRefStubFactory },
      ]
    });

    router = TestBed.inject(Router);
    config = TestBed.inject(ConfigService);
    localStorageRef = TestBed.inject(LocalStorageRefService);

    localStorageRef.nativeLocalStorage.clear();
    localStorageRef.nativeLocalStorage.setItem('access_token', 'access');

    spyOn(router, 'navigateByUrl').and.stub();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('links', () => {
    let routerLinks: RouterLink[];

    beforeEach(() => {
      const elements: DebugElement[] = fixture.debugElement.queryAll(By.directive(RouterLink));
      routerLinks = elements.map(element => element.injector.get(RouterLink));
    });

    it('should have a router link', () => {
      expect(routerLinks.length).toBe(1);
    });

    it('first link should be dashboard', () => {
      expect(routerLinks[0].href).toBe('/dashboard');
    });

    it('contains logout link', () => {
      const logoutButtonContainer: DebugElement = fixture.debugElement.query(By.css('.logout-button-container'));
      expect(logoutButtonContainer).toBeTruthy();

      const logoutButton: DebugElement = logoutButtonContainer.query(By.css('a'));
      expect(logoutButton).toBeTruthy();
    });

    it('logout link should call logout()', () => {
      spyOn(component, 'logout').and.callThrough();
      
      const logoutButtonContainer: DebugElement = fixture.debugElement.query(By.css('.logout-button-container'));
      const logoutButton: DebugElement = logoutButtonContainer!.query(By.css('a'));
      logoutButton.nativeElement.click();

      expect(component.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout()', () => {

    beforeEach(() => {
      component.logout();
    });

    it('should remove access_token from local storage', () => {
      expect(localStorageRef.nativeLocalStorage.getItem('access_token')).toBeFalsy();
    });

    it('should navigate to logout redirect uri', () => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(config.logoutRedirectUri);
    });
  });
});
